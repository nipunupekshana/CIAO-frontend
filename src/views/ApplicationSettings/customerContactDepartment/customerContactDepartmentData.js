/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateCustomerConDept,
  deleteCustomerConDept,
  getCustomerConDept
} from "./../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";

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
  Input,
  InputGroup,
  Alert
} from "reactstrap";

class customerContactDepartmentData extends Component {
  state = {
    modal: false,
    isOpen: false,

    id: null,
    Name: "",
    msg: null
  };
  componentDidMount() {
    this.props.GET_CUSTOMER_CON_DEPT_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, CustomerConDeptUpdateStatus } = this.props;

    if (
      CustomerConDeptUpdateStatus !== prevProps.CustomerConDeptUpdateStatus &&
      CustomerConDeptUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_CUSTOMER_CONTACT_DEPARTMENT_UNSUCCESS") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({ msg: null });
    this.setState({ modal: !this.state.modal });
  };

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_CUSTOMER_CON_DEPT_DATA(id);
  }

  updateRaw = (id) => {
    console.log(id);

    if (id) {
      this.setState({
        id: id.id,
        Name: id.name
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { id, Name } = this.state;

    if (!Name) {
      this.setState({ msg: "Please Fill All Data!" });
    } else {
      this.setState({ msg: null });

      const newCusDept = {
        id,
        Name
      };
      console.log(id, Name);

      this.props.UPDATE_CUSTOMER_CON_DEPT_DATA(newCusDept);
    }
  };

  render() {
    const coulmns = [
      {
        Header: " Name",
        accessor: "name",
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
                  this.deleteRaw(props.original.id);
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
              Update Customer Contact Department Data
            </ModalHeader>
            <ModalBody>
              <Container>
                <Card className="mx-1 ">
                  <CardBody className="p-4  ">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Name:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Name"
                              name="Name"
                              value={this.state.Name}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

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
                <i className="fa fa-align-justify"></i>Customer Contact
                Department
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.CustomerConDeptData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.CustomerConDeptData}
                    defaultPageSize={10}
                    noDataText={"No Customer Contact Department Data Available"}
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

const mapStateToProps = (state) => ({
  CustomerConDeptData: state.AppSetting.CustomerConDeptData,
  CustomerConDeptUpdateStatus: state.AppSetting.CustomerConDeptUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_CUSTOMER_CON_DEPT_DATA: (Update) =>
      dispach(updateCustomerConDept(Update)),
    DELETE_CUSTOMER_CON_DEPT_DATA: (id) => dispach(deleteCustomerConDept(id)),
    GET_CUSTOMER_CON_DEPT_DATA: () => dispach(getCustomerConDept()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(customerContactDepartmentData);
