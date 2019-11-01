/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateCustomerType,
  deleteCustomerType,
  getCustomerType
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

class CustomerTypeData extends Component {
  state = {
    modal: false,
    isOpen: false,

    id: null,
    Name: "",
    msg: null
  };
  componentDidMount() {
    this.props.GET_CUSTOMER_TYPE_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, CustomerTypeUpdateStatus } = this.props;

    if (
      CustomerTypeUpdateStatus !== prevProps.CustomerTypeUpdateStatus &&
      CustomerTypeUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_CUSTOMER_TYPE_UNSUCCESS") {
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

    this.props.DELETE_CUSTOMER_TYPE_DATA(id);
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

      this.props.UPDATE_CUSTOMER_TYPE_DATA(newCusDept);
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
              Update Customer Type Data
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
                <i className="fa fa-align-justify"></i>Customer Type
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.CustomerTypeData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.CustomerTypeData}
                    defaultPageSize={10}
                    noDataText={"No Customer Contact Type Data Available"}
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
  CustomerTypeData: state.AppSetting.CustomerTypeData,
  CustomerTypeUpdateStatus: state.AppSetting.CustomerTypeUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_CUSTOMER_TYPE_DATA: (Update) => dispach(updateCustomerType(Update)),
    DELETE_CUSTOMER_TYPE_DATA: (id) => dispach(deleteCustomerType(id)),
    GET_CUSTOMER_TYPE_DATA: () => dispach(getCustomerType()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CustomerTypeData);
