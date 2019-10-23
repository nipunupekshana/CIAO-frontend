/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  getUserGroup,
  updateUser,
  deleteUser,
  showusers
} from "../../actions/tableActions";

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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown
} from "reactstrap";

class Users extends Component {
  state = {
    isOpen: false,
    modal: false,
    rawid: null,
    id: null,

    name: null,
    username: null,
    role: null,
    userGroupId: null,
    roleName: null,
    visibilityUpdate: false,
    visibilityDelete: false
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
    this.props.SHOWUSER();
    this.props.GET_USER_GROUP();
    console.log("im called users data");
  }

  modeltoggle = () => {
    //this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };
  dropdowntoggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  changeValue(e) {
    console.log("im called");
    this.setState({ roleName: e.target.name });
  }

  getRow(id) {
    return this.props.usersData.findIndex((row) => {
      return row.id === id;
    });
  }
  deleteRaw(id) {
    //const index = this.getRow(id);
    console.log("Index: ", id);
    this.props.DELETE_USER(id);
  }
  getUserRoleName = (userid) => {
    this.props.userrole.map((res) => {
      if (userid === res.id) {
        this.setState({ roleName: res.name, role: res.name });

        return true;
      }
      return false;
    });
  };

  updateRaw = (id) => {
    const rawid = this.getRow(id);

    this.setState({ rawid: rawid });
    if (rawid != null && this.props.usersData != null) {
      let userid = this.props.usersData[rawid].userGroupId;

      this.setState({
        name: this.props.usersData[rawid].name,
        username: this.props.usersData[rawid].username,
        id: this.props.usersData[rawid].id,
        userGroupId: this.props.usersData[rawid].userGroupId
      });
      this.getUserRoleName(userid);
      this.modeltoggle();
    }
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.modeltoggle();
    const { name, username, id, roleName } = this.state;
    let userGroupId = null;
    // eslint-disable-next-line array-callback-return
    this.props.userrole.map((res) => {
      if (roleName === res.name) {
        return (userGroupId = res.id);
      }
    });

    const newUser = {
      id,
      name,
      username,
      userGroupId
    };
    this.props.UPDATE_USER(newUser);
  };

  render() {
    const coulmns = [
      {
        Header: "Name",
        Cell: (e) => <a href={e.value}>{e.value}</a>,
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "User Name",
        accessor: "username",
        sortable: true,
        filterable: true
      },
      {
        Header: "Role",
        accessor: "userGroupId",
        sortable: true,
        filterable: true
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
                  this.deleteRaw(props.original);
                }}
              >
                Delete
              </Button>
              <Button
                color="info"
                disabled={this.state.visibilityUpdate}
                onClick={() => {
                  this.updateRaw(props.original.id);
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
        {this.showmodal}
        <div>
          <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
            <ModalHeader toggle={this.modeltoggle}>
              Update User Data
            </ModalHeader>
            <ModalBody>
              <Container>
                <Card className="mx-1 ">
                  <CardBody className="p-4  ">
                    <Form onSubmit={this.onSubmit}>
                      <div className="form-group row">
                        <label
                          htmlFor="inputname"
                          className="col-sm-2 col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            value={this.state.name ? this.state.name : ""}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputusername"
                          className="col-sm-2 col-form-label"
                        >
                          User Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="username"
                            onChange={this.onChange}
                            value={
                              this.state.username ? this.state.username : ""
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputrole"
                          className="col-sm-2 col-form-label"
                        >
                          Role
                        </label>
                        <div className="col-sm-10">
                          <div className="dropdown">
                            <ButtonDropdown
                              isOpen={this.state.isOpen}
                              toggle={() => {
                                this.dropdowntoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.roleName
                                  ? this.state.roleName
                                  : "not found"}
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  name="User"
                                  onClick={(e) => {
                                    this.changeValue(e);
                                  }}
                                >
                                  User
                                </DropdownItem>

                                <DropdownItem
                                  name="Admin"
                                  onClick={(e) => {
                                    this.changeValue(e);
                                  }}
                                >
                                  Admin
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </div>
                        </div>
                      </div>

                      <Button block color="success">
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
                <i className="fa fa-align-justify"></i> Users
                <small className="text-muted">Data</small>
              </CardHeader>
              <CardBody>
                {this.props.usersData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.usersData}
                    defaultPageSize={10}
                    noDataText={"No Users Available"}
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
  usersData: state.table.users,
  permissions: state.auth.permission,
  userrole: state.table.usergroup
});

const mapDispachToProps = (dispach) => {
  return {
    //REGISTER: (newUser) => dispach(register(newUser)),
    GET_USER_GROUP: () => dispach(getUserGroup()),
    SHOWUSER: () => dispach(showusers()),
    UPDATE_USER: user => dispach(updateUser(user)),
    DELETE_USER: id => dispach(deleteUser(id))
    //CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Users);
