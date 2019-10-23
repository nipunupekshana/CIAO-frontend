/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  getRoleMapping,
  getUserRoles,
  getProgram,
  updateRolePermissionMap,
  deleteRolePermissionMap
} from "../../../actions/tableActions";
import Switch from "react-toggle-switch";
import "../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Container,
  Alert,
  InputGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalFooter
} from "reactstrap";

class RolePermission extends Component {
  state = {
    modal: false,
    SubModal: false,
    closeAll: false,
    Prompt: null,

    Prompt2: null,
    SubModal2: false,
    closeAll2: false,
    deleteData: null,

    RoleisOpen: false,
    ProgramisOpen: false,
    rawid: null,

    PermissionId: null,
    id: null,

    name: null,
    programId: null,
    roleId: null,
    Create: null,
    Read: null,
    Update: null,
    Delete: null,
    UpdateRolePermmision: null,

    RoledropDownValue: "Please Select",
    ProgramdropDownValue: "Please Select",

    visibilityUpdate: false,
    visibilityDelete: false,
    msg: null
  };
  componentDidMount() {
    const { permissions } = this.props;
    console.log("Visibility update :" + permissions.update);
    if (permissions) {
      if (permissions.name === "admin") {
        if (permissions.update === 1) {
          this.setState({ visibilityUpdate: false });
        } else {
          this.setState({ visibilityUpdate: true });
        }

        if (permissions.delete === 1) {
          this.setState({ visibilityDelete: false });
        } else {
          this.setState({ visibilityDelete: true });
        }
      }
    }
    this.props.GET_ROLE_PERMISSION_MAP();
    this.props.GET_ROLE();
    this.props.GET_PROGRAM();

    console.log("im called users group data");
  }

  GetPermissionStatus = (id) => {
    if (id == 1) {
      return true;
    } else {
      return false;
    }
  };

  GetPermissionToNumber = (id) => {
    if (id == true) {
      return 1;
    } else {
      return 0;
    }
  };

  modeltoggle = () => {
    //this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  toggleNested2 = (data = "") => {
    if (data !== "") {
      this.props.Program.map((val) => {
        if (val.name === data.ProgramName) {
          this.setState({ ProgramId: parseInt(val.id) });
        }
      });

      this.setState({
        PermissionId: parseInt(data.PermissionID),
        id: parseInt(data.id)
      });
    }
    this.setState({
      SubModal2: !this.state.SubModal2
    });
  };

  Roletoggle() {
    this.setState({ RoleisOpen: !this.state.RoleisOpen });
  }

  Programtoggle() {
    this.setState({ ProgramisOpen: !this.state.ProgramisOpen });
  }

  getRow(id) {
    return this.props.rolePermissionMapData.findIndex((row) => {
      return row.id === id;
    });
  }
  deleteRaw() {
    const { PermissionId, id, Prompt2, ProgramId } = this.state;

    this.props.DELETE_ROLE_PERMISSION(PermissionId, id, ProgramId, Prompt2);
  }

  updateRaw = (id) => {
    const { Program, roles } = this.props;

    console.log(id);
    this.setState({
      PermissionId: parseInt(id.PermissionID),
      id: parseInt(id.id),
      Create: this.GetPermissionStatus(id.Pcreate),
      Read: this.GetPermissionStatus(id.Pread),
      Update: this.GetPermissionStatus(id.Pupdate),
      Delete: this.GetPermissionStatus(id.Pdelete)
    });

    // eslint-disable-next-line array-callback-return
    roles.map((rid) => {
      if (id.RoleName === rid.name) {
        this.setState({ roleId: parseInt(rid.id) });
      }
    });

    // eslint-disable-next-line array-callback-return
    Program.map((pid) => {
      if (id.ProgramName === pid.name) {
        this.setState({ programId: parseInt(pid.id) });
      }
    });

    this.setState(
      { RoledropDownValue: id.RoleName, ProgramdropDownValue: id.ProgramName },
      () => this.modeltoggle()
    );
  };

  toggleSwitch = (switchName) => {
    console.log(switchName);
    if (switchName === "Create") {
      this.setState({ Create: !this.state.Create });
    } else if (switchName === "Read") {
      this.setState({ Read: !this.state.Read });
    } else if (switchName === "Update") {
      this.setState({ Update: !this.state.Update });
    } else if (switchName === "Delete") {
      this.setState({ Delete: !this.state.Delete });
    }
  };

  changeValue(e, name) {
    console.log(e.target.name);
    if (e.target.name === "programId") {
      this.setState({
        [e.target.name]: parseInt(e.target.id),

        ProgramdropDownValue: name
      });
    } else if (e.target.name === "roleId") {
      this.setState({
        [e.target.name]: parseInt(e.target.id),
        RoledropDownValue: name
      });
    }
  }

  UpdateData() {
    const { UpdateRolePermmision } = this.state;

    this.setState({ msg: null });
    this.props.UPDATE_ROLE_PERMISSION_MAP(
      UpdateRolePermmision,
      this.state.Prompt
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    let c = null;
    let r = null;
    let u = null;
    let d = null;

    const {
      roleId,
      programId,
      Create,
      Read,
      Update,
      Delete,
      id,
      PermissionId,
      RoledropDownValue,
      ProgramdropDownValue
    } = this.state;

    c = this.GetPermissionToNumber(Create);
    r = this.GetPermissionToNumber(Read);
    u = this.GetPermissionToNumber(Update);
    d = this.GetPermissionToNumber(Delete);

    if ((RoledropDownValue || ProgramdropDownValue) === "Please Select") {
      this.setState({ msg: "Please Select Role Or Program" });
    } else {
      if (c !== null && r !== null && u !== null && d !== null) {
        console.log("im in" + id);
        const UpdateRolePermmision = {
          id,
          PermissionId,
          roleId,
          programId,
          c,
          r,
          u,
          d
        };

        this.setState({ UpdateRolePermmision: UpdateRolePermmision });
        this.toggleNested2();

        //this.modeltoggle();
      } else {
        console.log("it has null");
      }
    }
  };

  render() {
    const coulmns = [
      {
        Header: "ID",
        Cell: (e) => <a href={e.value}>{e.value}</a>,
        accessor: "id",
        sortable: true,
        filterable: true,
        width: 50,
        maxWidth: 50,
        minWidth: 10
      },
      {
        Header: "Role Name",
        accessor: "RoleName",
        sortable: true,
        filterable: true
      },
      {
        Header: "Program Name",
        accessor: "ProgramName",
        sortable: true,
        filterable: true
      },

      {
        Header: "Create",
        Cell: (props) => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch("Delete")}
                on={
                  this.props.rolePermissionMapData
                    ? this.GetPermissionStatus(props.original.Pcreate)
                    : false
                }
                enabled={false}
              />
            </div>
          );
        },

        sortable: false,
        filterable: false
      },
      {
        Header: "Read",
        Cell: (props) => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch("Delete")}
                on={
                  this.props.rolePermissionMapData
                    ? this.GetPermissionStatus(props.original.Pread)
                    : false
                }
                enabled={false}
              />
            </div>
          );
        },

        sortable: false,
        filterable: false
      },
      {
        Header: "Update",
        Cell: (props) => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch("Delete")}
                on={
                  this.props.rolePermissionMapData
                    ? this.GetPermissionStatus(props.original.Pupdate)
                    : false
                }
                enabled={false}
              />
            </div>
          );
        },

        sortable: false,
        filterable: false
      },
      {
        Header: "Delete",
        Cell: (props) => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch("Delete")}
                on={
                  this.props.rolePermissionMapData
                    ? this.GetPermissionStatus(props.original.Pdelete)
                    : false
                }
                enabled={false}
              />
            </div>
          );
        },

        sortable: false,
        filterable: false
      },
      {
        Header: "Action",
        Cell: (props) => {
          return (
            <div>
              <Button
                className="mr-2"
                color="danger"
                disabled={this.state.visibilityDelete}
                onClick={() => {
                  this.toggleNested2(props.original);
                }}
              >
                Delete
              </Button>
              <Button
                color="info"
                disabled={this.state.visibilityUpdate}
                onClick={() => {
                  this.updateRaw(props.original);
                }}
              >
                Update
              </Button>
            </div>
          );
        },

        sortable: false,
        filterable: false,
        width: 160,
        maxWidth: 160,
        minWidth: 40
      }
    ];

    return (
      <div className="animated fadeIn">
        <div>
          <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
            <ModalHeader toggle={this.modeltoggle}>
              Map Role Permission
            </ModalHeader>
            <ModalBody>
              <Container>
                <Card className="mx-1 ">
                  <CardBody className="p-4">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      {/* ///drop dwon Role/// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-2">Role Name</b>
                          </Col>

                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.RoleisOpen}
                              toggle={() => {
                                this.Roletoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.RoledropDownValue}
                              </DropdownToggle>
                              <DropdownMenu right>
                                {this.props.roles
                                  ? this.props.roles.map((role, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="roleId"
                                          id={role.id}
                                          onClick={(e) =>
                                            this.changeValue(e, role.name)
                                          }
                                        >
                                          {role.name}
                                        </DropdownItem>
                                      </div>
                                    ))
                                  : ""}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      {/* ///drop down Program/// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Program Name</b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.ProgramisOpen}
                              toggle={() => {
                                this.Programtoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.ProgramdropDownValue}
                              </DropdownToggle>
                              <DropdownMenu right>
                                {this.props.Program
                                  ? this.props.Program.map((Program, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="programId"
                                          id={Program.id}
                                          onClick={(e) =>
                                            this.changeValue(e, Program.name)
                                          }
                                        >
                                          {Program.name}
                                        </DropdownItem>
                                      </div>
                                    ))
                                  : ""}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Create</b>
                          </Col>
                          <Col>
                            <Switch
                              onClick={() => this.toggleSwitch("Create")}
                              on={this.state.Create ? this.state.Create : false}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Read</b>
                          </Col>
                          <Col>
                            <Switch
                              onClick={() => this.toggleSwitch("Read")}
                              on={this.state.Read ? this.state.Read : false}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Update</b>
                          </Col>
                          <Col>
                            <Switch
                              onClick={() => this.toggleSwitch("Update")}
                              on={this.state.Update ? this.state.Update : false}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Delete</b>
                          </Col>
                          <Col>
                            <Switch
                              onClick={() => this.toggleSwitch("Delete")}
                              on={this.state.Delete ? this.state.Delete : false}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Button color="success" block>
                        Update
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Container>

              <Modal
                isOpen={this.state.SubModal}
                toggle={this.toggleNested}
                onClosed={this.state.closeAll ? this.toggle : undefined}
              >
                <ModalHeader>Attention!</ModalHeader>
                <ModalBody>
                  Do you need to copy this permission to other users also?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.toggleAll();
                      this.setState({ Prompt: true }, () => {
                        this.UpdateData();
                      });
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      this.toggleAll();
                      this.setState({ Prompt: false }, () => {
                        this.UpdateData();
                      });
                    }}
                  >
                    No
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
          </Modal>
        </div>

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Role Permission Mapping
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.rolePermissionMapData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.rolePermissionMapData}
                    defaultPageSize={10}
                    noDataText={"No Data Available"}
                  ></ReactTable>
                ) : null}

                <Modal
                  isOpen={this.state.SubModal2}
                  toggle={this.toggleNested2}
                >
                  <ModalHeader toggle={this.toggleNested2}>
                    Attention!
                  </ModalHeader>
                  <ModalBody>
                    Do you need to Delete this permission From other users also?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        this.toggleNested2();
                        this.setState({ Prompt2: true }, () => {
                          this.deleteRaw();
                        });
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        this.toggleNested2();
                        this.setState({ Prompt2: false }, () => {
                          this.deleteRaw();
                        });
                      }}
                    >
                      No
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  permissions: state.auth.permission,
  Program: state.table.Program,
  roles: state.table.roles,
  rolePermissionMapData: state.table.rolePermissionMapData
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_ROLE_PERMISSION_MAP: (RolePermissionData, Prompt) =>
      dispach(updateRolePermissionMap(RolePermissionData, Prompt)),
    DELETE_ROLE_PERMISSION: (PermissionId, id, ProgramId, Prompt2) =>
      dispach(deleteRolePermissionMap(PermissionId, id, ProgramId, Prompt2)),
    GET_ROLE_PERMISSION_MAP: () => dispach(getRoleMapping()),
    GET_ROLE: () => dispach(getUserRoles()),
    GET_PROGRAM: () => dispach(getProgram())
    //CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(RolePermission);
