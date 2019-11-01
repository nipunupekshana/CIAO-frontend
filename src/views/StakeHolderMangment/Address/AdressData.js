/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updatePaymentTerm,
  deletePaymentTerm,
  getPaymentTerm,
  getRegion,
  getCountry
} from "../../../actions/AuthApplicationSettingActions";
import Select from "react-select";

import { clearErrors } from "../../../actions/errorActions";
import {
  getCustomerSearched,
  getCustomerAddresses,
  makeAddressEmpty,
  getCustomer
} from "./../../../actions/StakeholderAction";
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
  Alert,
  CardTitle
} from "reactstrap";
import { Label } from "semantic-ui-react";
import "./Address.css";

class AdressData extends Component {
  state = {
    modal: false,
    isOpen: false,
    noData: false,

    id: null,
    CustomerName: "",

    Name: "",
    CustomerId: null,

    recipient: null,
    streetAddress1: "",
    streetAddress2: "",
    city: null,
    contactPerson: "",
    contactNumber: null,
    isBilling: false,
    isDelivery: false,
    countryId: null,
    countryName: "",
    regionId: null,
    regionName: "",
    msg: null,

    xyz: {}
  };
  componentDidMount() {
    this.props.GET_CUSTOMER();
    this.props.GET_COUNTRY_DATA();
    this.props.GET_REGION_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, CustomerAdressUpdateStatus } = this.props;

    if (
      CustomerAdressUpdateStatus !== prevProps.CustomerAdressUpdateStatus &&
      CustomerAdressUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_ADDRESS_UNSUCCESS") {
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
    console.log("Data is : " + JSON.stringify(this.state.xyz));
  };

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_PAYMENT_TERM_DATA(id);
  }

  updateRaw = (id) => {
    console.log(id);
    console.log("Recipent " + id.recipient);

    if (id) {
      this.setState({
        id: id.id,
        CustomerId: id.customerId,
        CustomerName: id.customerName,
        recipient: id.recipient,
        streetAddress1: id.streetAddress1,
        streetAddress2: id.streetAddress2,
        city: id.city,
        contactPerson: id.contactPerson,
        contactNumber: id.contactNumber,
        isBilling: id.isBilling,
        isDelivery: id.isDelivery,
        countryId: id.countryId,
        countryName: id.contryName,
        regionId: id.regionId,
        regionName: id.regionName
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  changeValue(e, name) {
    console.log(e);
    console.log(name);

    if (name === "customerId") {
      if (e !== null) {
        console.log("Customer Id " + e.value);
        this.props.GET_CUS_ADDRESS_DATA(e.value);

        this.setState({
          CustomerId: e.value
        });
      } else {
        this.props.SET_CUS_ADDRESS_DATA_EMPTY();
        this.setState({
          CustomerId: ""
        });
      }
    }
    if (name === "customerIdUpdate") {
      if (e !== null) {
        console.log("Customer Id " + e.value);

        this.setState({
          CustomerId: e.value,
          CustomerName: e.label
        });
      } else {
        this.setState({
          CustomerId: "",
          CustomerName: ""
        });
      }
    }

    if (name === "countryId") {
      if (e !== null) {
        this.setState({
          countryId: e.value,
          countryName: e.label
        });
      } else {
        this.setState({
          countryId: "",
          countryName: ""
        });
      }
    }

    if (name === "regionId") {
      if (e !== null) {
        this.setState({
          regionId: e.value,
          regionName: e.label
        });
      } else {
        this.setState({
          regionId: "",
          regionName: ""
        });
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      id,
      CustomerId,
      recipient,
      streetAddress1,
      streetAddress2,
      city,
      countryId,
      regionId,

      contactPerson,
      contactNumber,
      isBilling,
      isDelivery
    } = this.state;
    console.log(
      "Lets  check " + id,
      CustomerId,
      recipient,
      streetAddress1,
      streetAddress2,
      city,
      countryId,
      regionId,

      contactPerson,
      contactNumber,
      isBilling,
      isDelivery
    );
    if (
      !CustomerId ||
      !recipient ||
      !streetAddress1 ||
      !city ||
      countryId == null ||
      regionId == null ||
      !contactPerson ||
      !contactNumber
    ) {
      this.setState({ msg: "Please Fill All Data!" });
    } else {
      this.setState({ msg: null });

      const newAddress = {
        id,
        CustomerId,
        recipient,
        streetAddress1,
        streetAddress2,
        city,
        countryId,
        regionId,

        contactPerson,
        contactNumber,
        isBilling,
        isDelivery
      };

      //this.props.UPDATE_ADDRESS_DATA(newAddress);
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div>
          <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
            <ModalHeader toggle={this.modeltoggle}>
              Update Address Data
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
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Customer Name:</b>
                          </Col>
                          <Col>
                            <Select
                              closeMenuOnSelect={false}
                              value={{
                                label: this.state.CustomerName,
                                value: this.state.CustomerId
                              }}
                              options={
                                this.props.cusAddressSearchedData
                                  ? this.props.cusAddressSearchedData
                                  : ""
                              }
                              onInputChange={(e) =>
                                this.props.GET_CUS_SEARCH_DATA(e)
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) =>
                                this.changeValue(e, "customerIdUpdate")
                              }
                            ></Select>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Recipient:</b>
                          </Col>
                          <Col>
                            <Input
                              required
                              type="text"
                              placeholder="Recipient"
                              value={this.state.recipient}
                              name="recipient"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Street Address 1:</b>
                          </Col>
                          <Col>
                            <Input
                              required
                              type="text"
                              placeholder="Street Address 1"
                              name="streetAddress1"
                              value={this.state.streetAddress1}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Street Address 2:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Street Address 2"
                              name="streetAddress2"
                              value={this.state.streetAddress2}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Country:</b>
                          </Col>
                          <Col>
                            <Select
                              closeMenuOnSelect={false}
                              options={
                                this.props.CountryData
                                  ? this.props.CountryData
                                  : ""
                              }
                              value={{
                                label: this.state.countryName,
                                value: this.state.countryId
                              }}
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) => this.changeValue(e, "countryId")}
                            ></Select>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>City:</b>
                          </Col>
                          <Col>
                            <Input
                              required
                              type="text"
                              placeholder="City"
                              name="city"
                              value={this.state.city}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Region:</b>
                          </Col>
                          <Col>
                            <Select
                              closeMenuOnSelect={false}
                              options={
                                this.props.RegionData
                                  ? this.props.RegionData
                                  : ""
                              }
                              value={{
                                label: this.state.regionName,
                                value: this.state.regionId
                              }}
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) => this.changeValue(e, "regionId")}
                            ></Select>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Contact Person:</b>
                          </Col>
                          <Col>
                            <Input
                              required
                              type="text"
                              placeholder="Contact Person"
                              name="contactPerson"
                              value={this.state.contactPerson}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b>Contact Number:</b>
                          </Col>
                          <Col>
                            <Input
                              required
                              type="number"
                              placeholder="Contact Number"
                              name="contactNumber"
                              min="0"
                              value={this.state.contactNumber}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b htmlFor="isBilling">Is Billing:</b>
                          </Col>
                          <Col>
                            <Input
                              className="ml-2"
                              type="checkbox"
                              id="isBilling"
                              checked={this.state.isBilling}
                              onChange={() => {
                                this.setState({
                                  isBilling: !this.state.isBilling
                                });
                              }}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col>
                            <b htmlFor="isDelivery">is Delivery:</b>
                          </Col>
                          <Col>
                            <Input
                              className="ml-2"
                              type="checkbox"
                              id="isDelivery"
                              checked={this.state.isDelivery}
                              onChange={() => {
                                this.setState({
                                  isDelivery: !this.state.isDelivery
                                });
                              }}
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
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Address
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                <Col>
                  <Row>
                    <InputGroup className="mb-2">
                      <Col xs="7" sm="8" md="10" lg="4" xl="3">
                        <b>Customer Name:</b>
                      </Col>
                      <Col xs="7" sm="8" md="10" lg="4" xl="3">
                        <Select
                          closeMenuOnSelect={false}
                          options={
                            this.props.cusAddressSearchedData
                              ? this.props.cusAddressSearchedData
                              : ""
                          }
                          loadingMessage="Loading!"
                          menuShouldBlockScroll={true}
                          placeholder="Search.."
                          isSearchable={true}
                          isClearable={true}
                          onInputChange={(e) =>
                            this.props.GET_CUS_SEARCH_DATA(e)
                          }
                          onChange={(e) => this.changeValue(e, "customerId")}
                        ></Select>
                      </Col>
                    </InputGroup>
                  </Row>
                </Col>

                <Col>
                  <Row>
                    {this.props.cusAddressData
                      ? this.props.cusAddressData.map((dta, key) => (
                          <Card
                            className="shadow p-3 mb-5 bg-white rounded border border-secondary   mr-2 animated  pulse "
                            key={key}
                          >
                            <CardTitle className="text-primary">
                              {dta.recipient}
                              <Col>
                                <Row className="d-flex justify-content-end">
                                  <Col
                                    xs="7"
                                    sm="8"
                                    md="10"
                                    lg="4"
                                    xl="1"
                                    name={dta.id}
                                    onClick={(e) => {
                                      this.updateRaw(dta);
                                    }}
                                  >
                                    <a>
                                      <i className=" updateIcon fa fa-pencil-square-o  " />
                                    </a>
                                  </Col>
                                  <Col xs="7" sm="8" md="10" lg="4" xl="1">
                                    <a href="">
                                      <i className="updateIcon fa fa fa-trash " />
                                    </a>
                                  </Col>
                                </Row>
                              </Col>
                            </CardTitle>
                            <Label>
                              <b>Street Address 1 : </b> {dta.streetAddress1}
                            </Label>
                            <Label
                              className={
                                dta.streetAddress2 !== null
                                  ? "visble"
                                  : "invisible"
                              }
                            >
                              <b>Street Address 2 : </b>
                              {dta.streetAddress2 !== null
                                ? dta.streetAddress2
                                : ""}
                            </Label>
                            <Label>
                              <b>City : </b>
                              {dta.city}
                            </Label>
                            <Label>
                              <b>Contact Person : </b>
                              {dta.contactPerson}
                            </Label>
                            <Label>
                              <b>Contact Number : </b> {dta.contactNumber}
                            </Label>
                            <Label>
                              <b>isBilling : </b>
                              <Input
                                className="ml-2"
                                type="checkbox"
                                id="isDelivery"
                                checked={dta.isBilling === 1 ? true : false}
                                disabled={true}
                              />
                            </Label>
                            <Label>
                              <b>isDelivery : </b>{" "}
                              <Input
                                className="ml-2"
                                type="checkbox"
                                id="isDelivery"
                                checked={dta.isDelivery === 1 ? true : false}
                                disabled={true}
                              />
                            </Label>
                          </Card>
                        ))
                      : ""}
                  </Row>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cusAddressData: state.StakeHolderSetting.cusAddressData,
  CustomerAdressUpdateStatus:
    state.StakeHolderSetting.CustomerAdressUpdateStatus,
  CustomerData: state.StakeHolderSetting.CustomerData,
  CountryData: state.AppSetting.CountryData,
  RegionData: state.AppSetting.RegionData,
  cusAddressSearchedData: state.StakeHolderSetting.cusAddressSearchedData,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_PAYMENT_TERM_DATA: (Update) => dispach(updatePaymentTerm(Update)),
    DELETE_PAYMENT_TERM_DATA: (id) => dispach(deletePaymentTerm(id)),
    GET_PAYMENT_TERM: () => dispach(getPaymentTerm()),
    GET_CUSTOMER: () => dispach(getCustomer()),
    GET_REGION_DATA: () => dispach(getRegion()),
    GET_COUNTRY_DATA: () => dispach(getCountry()),
    GET_CUS_SEARCH_DATA: (e) => dispach(getCustomerSearched(e)),
    GET_CUS_ADDRESS_DATA: (id) => dispach(getCustomerAddresses(id)),
    SET_CUS_ADDRESS_DATA_EMPTY: () => dispach(makeAddressEmpty()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(AdressData);
