/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateUserRoles,
  deleteUserRole,
  getUserRoles
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
  Container
} from "reactstrap";

class Roles extends Component {
  state = {
    modal: false,
    rawid: null,
    id: null,

    name: null,



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
    this.props.GET_USER_ROLES();


  }

  modeltoggle = () => {
    //this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  getRow(id) {
    return this.props.usersroles.findIndex(row => {
      return row.id === id;
    });
  }
  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_USER_ROLE(id);
  }

  updateRaw = id => {
    const rawid = this.getRow(id);

    this.setState({ rawid: rawid });
    if (rawid != null && this.props.usersroles != null) {
      //let userid = this.props.usersGroupData[rawid].userGroupId;

      this.setState({
        name: this.props.usersroles[rawid].name,
        id: this.props.usersroles[rawid].id
      });
      //this.getUserRoleName(userid);
      this.modeltoggle();
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.modeltoggle();
    const { name, id } = this.state;

    const newUserRole = {
      id,
      name
    };
    this.props.UPDATE_USER_ROLE(newUserRole);
  };

  render() {
    const coulmns = [
      {
        Header: "User Role Id",
        Cell: e => <a href={e.value}>{e.value}</a>,
        accessor: "id",
        sortable: true,
        filterable: true
      },
      {
        Header: "Name",
        accessor: "name",
        sortable: true,
        filterable: true
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
        <div>
          <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
            <ModalHeader toggle={this.modeltoggle}>
              Update User Roles
            </ModalHeader>
            <ModalBody>
              <Container>
                <Card className="mx-1 ">
                  <CardBody className="p-4  ">
                    <Form onSubmit={this.onSubmit}>
                      <div className="form-group row">
                        <label
                          htmlFor="inputname"
                          className="col-sm-3 col-form-label"
                        >
                          User Role ID
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            name="id"
                            className="form-control  "
                            id="id"
                            value={this.state.id ? this.state.id : ""}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="inputeUsergroupName"
                          className="col-sm-3 col-form-label"
                        >
                          User Role Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            name="name"
                            className="form-control "
                            id="rolename"
                            onChange={this.onChange}
                            value={this.state.name ? this.state.name : ""}
                          />
                        </div>
                      </div>

                      <Button block color="success">
                        Update User Role
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
                <i className="fa fa-align-justify"></i> User Roles
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.usersroles ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.usersroles}
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
  permissions: state.auth.permission,
  usersroles: state.table.roles
});

const mapDispachToProps = dispach => {
  return {
    UPDATE_USER_ROLE: user => dispach(updateUserRoles(user)),
    DELETE_USER_ROLE: id => dispach(deleteUserRole(id)),
    GET_USER_ROLES: () => dispach(getUserRoles())
    //CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Roles);
