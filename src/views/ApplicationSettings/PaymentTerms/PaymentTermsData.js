/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updatePaymentTerm,
  deletePaymentTerm,
  getPaymentTerm
} from "../../../actions/AuthApplicationSettingActions";
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

class PaymentTermsData extends Component {
  state = {
    modal: false,
    isOpen: false,

    id: null,
    Name: "",
    duePeriod: null,
    msg: null
  };
  componentDidMount() {
    this.props.GET_PAYMENT_TERM();
  }

  componentDidUpdate(prevProps) {
    const { error, PaymentTermUpdateStatus } = this.props;

    if (
      PaymentTermUpdateStatus !== prevProps.PaymentTermUpdateStatus &&
      PaymentTermUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_PAYMENT_TERM_UNSUCCESS") {
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

    this.props.DELETE_PAYMENT_TERM_DATA(id);
  }

  updateRaw = (id) => {
    console.log(id);

    if (id) {
      this.setState({
        id: id.id,
        Name: id.name,
        duePeriod: id.duePeriod
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { id, Name, duePeriod } = this.state;

    if (!Name || !duePeriod) {
      this.setState({ msg: "Please Fill All Data!" });
    } else {
      this.setState({ msg: null });

      const newPTerm = {
        id,
        Name,
        duePeriod
      };
      console.log(id, Name);

      this.props.UPDATE_PAYMENT_TERM_DATA(newPTerm);
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
        Header: " Due Period",
        accessor: "duePeriod",
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
              Update Payment Term Data
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

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Due Period:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="Due Period"
                              name="duePeriod"
                              min="0"
                              value={this.state.duePeriod}
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
                <i className="fa fa-align-justify"></i>Payment Term
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.PaymentTermData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.PaymentTermData}
                    defaultPageSize={10}
                    noDataText={"No Payment Term Data Available"}
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
  PaymentTermData: state.AppSetting.PaymentTermData,
  PaymentTermUpdateStatus: state.AppSetting.PaymentTermUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_PAYMENT_TERM_DATA: (Update) => dispach(updatePaymentTerm(Update)),
    DELETE_PAYMENT_TERM_DATA: (id) => dispach(deletePaymentTerm(id)),
    GET_PAYMENT_TERM: () => dispach(getPaymentTerm()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(PaymentTermsData);
