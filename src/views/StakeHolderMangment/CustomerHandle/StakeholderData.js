/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  updatePaymentTerm,
  deletePaymentTerm
} from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import { getCustomer } from "./../../../actions/StakeholderAction";
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

import StakeholderReg from "./StakeholderReg";

class StakeholderData extends Component {
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
        Header: " Id",
        accessor: "id",
        sortable: true,
        filterable: true
      },
      {
        Header: " Customer Type Name",
        accessor: "customerTypeName",
        sortable: true,
        filterable: true
      },
      {
        Header: " Nick Name",
        accessor: "nick",
        sortable: true,
        filterable: true
      },
      {
        Header: "Country Name",
        accessor: "countryName",
        sortable: true,
        filterable: true
      },
      {
        Header: " Tel 1",
        accessor: "tel1",
        sortable: true,
        filterable: true
      },
      {
        Header: "Currency Name",
        accessor: "currencyName",
        sortable: true,
        filterable: true
      },
      {
        Header: "Payment Method Name",
        accessor: "paymentMethodName",
        sortable: true,
        filterable: true
      },
      {
        Header: "Region Name",
        accessor: "regionName",
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
        <Row className="d-flex justify-content-end">
          <Button
            className="mb-2  mr-3 "
            color="success"
            onClick={() => this.props.history.push("/CustomerData/CustomerReg")}
          >
            Add Customer
          </Button>
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Customer
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.CustomerData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.CustomerData}
                    defaultPageSize={10}
                    noDataText={"No Customer Data Available"}
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
  CustomerData: state.StakeHolderSetting.CustomerData,
  PaymentTermUpdateStatus: state.AppSetting.PaymentTermUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_PAYMENT_TERM_DATA: (Update) => dispach(updatePaymentTerm(Update)),
    DELETE_PAYMENT_TERM_DATA: (id) => dispach(deletePaymentTerm(id)),
    GET_PAYMENT_TERM: () => dispach(getCustomer()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispachToProps
  )(StakeholderData)
);
