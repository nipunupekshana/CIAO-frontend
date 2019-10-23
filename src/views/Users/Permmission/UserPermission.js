/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateUserPermission,

  getProgram,
  
  deleteUserPermission,
  getUserPermission
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
  Dropdown
} from "reactstrap";

class UserPermission extends Component {
  state = {
    modal: false,
    UserisOpen: false,
    ProgramisOpen: false,
    rawid: null,

    PermissionId: null,
    id: null,

    name: null,
    programId: null,
    UserId: null,
    Create: null,
    Read: null,
    Update: null,
    Delete: null,

    UserName: "",
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

    this.props.GET_USER_PERMISSION_DATA();
  }

  GetPermissionStatus = id => {
    if (id == 1) {
      return true;
    } else {
      return false;
    }
  };

  GetPermissionToNumber = id => {
    // eslint-disable-next-line eqeqeq
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

  Usertoggle() {
    this.setState({ UserisOpen: !this.state.UserisOpen });
  }

  Programtoggle() {
    this.setState({ ProgramisOpen: !this.state.ProgramisOpen });
  }

  getRow(id) {
    return this.props.rolePermissionMapData.findIndex(row => {
      return row.id === id;
    });
  }
  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_USER_PERMISSION(id);
  }

  updateRaw = id => {
    const { Program} = this.props;

    console.log(id);
    this.setState({
      PermissionId: parseInt(id.userPermissionId),
      UserId: parseInt(id.userid),
      Create: this.GetPermissionStatus(id.create),
      Read: this.GetPermissionStatus(id.read),
      Update: this.GetPermissionStatus(id.update),
      Delete: this.GetPermissionStatus(id.delete)
    });

   

    // eslint-disable-next-line array-callback-return
    Program.map(pid => {
      if (id.ProgramName === pid.name) {
        this.setState({ programId: parseInt(pid.id) });
      }
    });

    this.setState(
      { UserName: id.username, ProgramdropDownValue: id.ProgramName },
      () => this.modeltoggle()
    );
  };

  toggleSwitch = switchName => {
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
    } else if (e.target.name === "UserId") {
      this.setState({
        [e.target.name]: parseInt(e.target.id),
        UserDropDownValue: name
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    let c = null;
    let r = null;
    let u = null;
    let d = null;

    const {
      UserId,
      programId,
      Create,
      Read,
      Update,
      Delete,
      PermissionId,
      UserName,
      ProgramdropDownValue
    } = this.state;

    console.log(UserId,
      programId,
      Create,
      Read,
      Update,
      Delete,
      PermissionId,
      UserName,
      ProgramdropDownValue)

    c = this.GetPermissionToNumber(Create);
    r = this.GetPermissionToNumber(Read);
    u = this.GetPermissionToNumber(Update);
    d = this.GetPermissionToNumber(Delete);

    if (
      ( ProgramdropDownValue) === "Please Select" ||
      (UserId == null || programId == null)
    ) {
      this.setState({ msg: "Please Select Program" });
    } else {
      if (c !== null && r !== null && u !== null && d !== null) {
        
        const UpdateUserPermmision = {
          
          PermissionId,
          UserId,
          programId,
          c,
          r,
          u,
          d
        };
        this.props.UPDATE_USER_PERMISSION(UpdateUserPermmision);
        this.setState({ msg: null });
        this.modeltoggle();
      } else {
        console.log("it has null");
      }
    }
  };

  render() {
    const coulmns = [
      {
        Header: "User Name",
        Cell: e => <a href={e.value}>{e.value}</a>,
        accessor: "username",
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
        Cell: props => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch("Delete")}
                on={
                  this.props.UserPermissionData
                    ? this.GetPermissionStatus(props.original.create)
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
        Cell: props => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch("Delete")}
                on={
                  this.props.UserPermissionData
                    ? this.GetPermissionStatus(props.original.read)
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
        Cell: props => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch("Delete")}
                on={
                  this.props.UserPermissionData
                    ? this.GetPermissionStatus(props.original.update)
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
        Cell: props => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch()}
                on={
                  this.props.UserPermissionData
                    ? this.GetPermissionStatus(props.original.delete)
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
        Header: "Override",
        Cell: props => {
          return (
            <div className="d-flex justify-content-center">
              <Switch
                onClick={() => this.toggleSwitch()}
                on={
                  this.props.UserPermissionData
                    ? this.GetPermissionStatus(props.original.override)
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
        Cell: props => {
          return (
            <div>
              <Button
                className="mr-2"
                color="danger"
                disabled={this.state.visibilityDelete}
                onClick={() => {
                  this.deleteRaw(props.original.userPermissionId);
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
              Update User Permission
            </ModalHeader>
            <ModalBody>
              <Container>
                <Card className="mx-1 ">
                  <CardBody className="p-4">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      {/* ///drop down User/// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col ><b className="mr-4">User : </b></Col>
                          <Col>{this.state.UserName}</Col>
                            
                        </InputGroup>
                      </Row>

                      {/* ///drop down Program/// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Program Name :</b>
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
                                          onClick={e =>
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
                            <b className="mr-4">Create :</b>
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
                            <b className="mr-4">Read :</b>
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
                            <b className="mr-4">Update :</b>
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
                            <b className="mr-4">Delete :</b>
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
            </ModalBody>
          </Modal>
        </div>

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> User Permission
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.UserPermissionData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.UserPermissionData}
                    defaultPageSize={10}
                    noDataText={"No Data Available"}
                  ></ReactTable>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.auth.permission,
  UserPermissionData: state.table.UserPermissionData,
  users: state.table.users,
  Program: state.table.Program,
  rolePermissionMapData: state.table.rolePermissionMapData
});

const mapDispachToProps = dispach => {
  return {
    GET_USER_PERMISSION_DATA: () => dispach(getUserPermission()),
    UPDATE_USER_PERMISSION: user => dispach(updateUserPermission(user)),
    DELETE_USER_PERMISSION: id => dispach(deleteUserPermission(id)),
    

    GET_PROGRAM: () => dispach(getProgram())
    //CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(UserPermission);
