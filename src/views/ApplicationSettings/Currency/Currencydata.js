/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateCurrency,
  deleteCurrency,
  getCurrency
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

class Currencydata extends Component {
  state = {
    modal: false,
    isOpen: false,

    id: null,
    Name: "",
    abbreviation: "",
    buyRate: null,
    sellrate: null,
    msg: null,
    decimalPlaces: null
  };
  componentDidMount() {
    this.props.GET_CURRENCY_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, CurrencyUpdateStatus } = this.props;

    if (
      CurrencyUpdateStatus !== prevProps.CurrencyUpdateStatus &&
      CurrencyUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_CURRENCY_UNSUCCESS") {
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

    this.props.DELETE_CURRENCY(id);
  }

  updateRaw = (id) => {
    console.log(id);

    if (id) {
      this.setState({
        id: id.id,
        Name: id.name,
        abbreviation: id.abbreviation,
        buyRate: id.buyRate,
        sellrate: id.sellrate,
        decimalPlaces: id.decimalPlaces
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      id,
      Name,
      abbreviation,
      buyRate,
      sellrate,
      decimalPlaces
    } = this.state;

    if (!Name || !abbreviation || !buyRate || !sellrate || !decimalPlaces) {
      this.setState({ msg: "Please Fill All Data!" });
    } else {
      this.setState({ msg: null });

      const newCurrency = {
        id,
        Name,
        abbreviation,
        buyRate,
        sellrate,
        decimalPlaces
      };
      console.log(id, Name, abbreviation, buyRate, sellrate, decimalPlaces);

      this.props.UPDATE_CURRENCY(newCurrency);
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
        Header: "Abbreviation",
        accessor: "abbreviation",
        sortable: true,
        filterable: true
      },
      {
        Header: "Buy Rate",
        accessor: "buyRate",
        sortable: true,
        filterable: true
      },
      {
        Header: "Sell Rate",
        accessor: "sellrate",
        sortable: true,
        filterable: true
      },
      {
        Header: "Decimal Places",
        accessor: "decimalPlaces",
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
              Update Currency Data
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
                            <b>Abbreviation:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Abbreviation"
                              name="abbreviation"
                              value={this.state.abbreviation}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>buy Rate:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="buy Rate"
                              name="buyRate"
                              min="0"
                              step="any"
                              value={this.state.buyRate}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>sell rate:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="Sell rate"
                              name="sellrate"
                              step="any"
                              value={this.state.sellrate}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Decimal Places:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="Decimal Places"
                              name="decimalPlaces"
                              value={this.state.decimalPlaces}
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
                <i className="fa fa-align-justify"></i> Currency
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.CurrencyData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.CurrencyData}
                    defaultPageSize={10}
                    noDataText={"No Currency Data Available"}
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
  CurrencyData: state.AppSetting.CurrencyData,

  CurrencyUpdateStatus: state.AppSetting.CurrencyUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_CURRENCY: (Update) => dispach(updateCurrency(Update)),
    DELETE_CURRENCY: (id) => dispach(deleteCurrency(id)),
    GET_CURRENCY_DATA: () => dispach(getCurrency()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Currencydata);
