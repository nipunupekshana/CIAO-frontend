import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
  Alert
} from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import {
  getCountry,
  getRegion,
  getTaxData
} from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import { AddCustomer, AddAddress } from "./../../../actions/StakeholderAction";
import "./Stakeholder.css";

class StakeholderAddress extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",

      streetAddress1: null,
      streetAddress2: null,
      city: null,
      countryId: null,
      countryName: null,
      regionId: null,
      regionName: null,
      contactPerson: null,
      contactNumber: null,
      isBilling: true,
      isDelivery: true,

      msg: null
    };
  }

  componentDidMount() {
    this.props.GET_COUNTRY_DATA();
    this.props.GET_REGION_DATA();
    if (this.props.AddToAddressData) {
      this.setState({
        Name: this.props.AddToAddressData.name,
        countryId: this.props.AddToAddressData.counrtyId,
        countryName: this.props.AddToAddressData.countryName,
        regionId: this.props.AddToAddressData.regionId,
        regionName: this.props.AddToAddressData.regionName
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "ADD_CUSTOMER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  changeValue(e, name) {
    console.log(e);
    console.log(name);

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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      Name,
      streetAddress1,
      streetAddress2,
      city,
      countryId,
      regionId,
      contactPerson,
      isBilling,
      isDelivery
    } = this.state;

    if (
      !Name ||
      !streetAddress1 ||
      !city ||
      (countryId === "" || countryId == null) ||
      (regionId === "" || regionId == null) ||
      !contactPerson
    ) {
      this.setState({ msg: "Please Fill the Details!" });
    } else {
      this.setState({ msg: null });
      const regAddress = {
        Name,
        streetAddress1,
        streetAddress2,
        city,
        countryId,
        regionId,
        contactPerson,
        isBilling,
        isDelivery
      };

      this.props.ADD_ADDRESS(regAddress);
    }
    console.log("testing " + countryId !== null);

    console.log(
      Name,
      streetAddress1,
      streetAddress2,
      city,
      countryId,
      regionId,
      contactPerson,
      isBilling,
      isDelivery
    );
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <Card className="mx-1">
                <CardBody className="p-2">
                  {this.state.msg ? (
                    <Alert color="danger">{this.state.msg}</Alert>
                  ) : null}
                  <Form onSubmit={this.onSubmit}>
                    <Col>
                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Recipient:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="10" xl="10">
                            <Input
                              type="text"
                              required
                              value={this.state.Name}
                              placeholder="Recipient"
                              name="Name"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Street Address 1:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              required
                              type="text"
                              placeholder="Street Address 1"
                              name="streetAddress1"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Street Address 2:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="text"
                              placeholder="Street Address 2"
                              name="streetAddress2"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>City:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              required
                              type="text"
                              placeholder="City"
                              name="city"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Country :</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              value={{
                                label: this.state.countryName,
                                value: this.state.counrtyId
                              }}
                              options={
                                this.props.CountryData
                                  ? this.props.CountryData
                                  : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) => this.changeValue(e, "countryId")}
                            ></Select>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Region:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              value={{
                                label: this.state.regionName,
                                value: this.state.regionId
                              }}
                              options={
                                this.props.RegionData
                                  ? this.props.RegionData
                                  : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) => this.changeValue(e, "regionId")}
                            ></Select>
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Contact Person:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              required
                              type="text"
                              placeholder="Contact Person"
                              name="contactPerson"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Contact Number:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="number"
                              required
                              placeholder="Contact Number"
                              name="contactNumber"
                              min="0"
                              maxLength="10"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Is Billing:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              className="ml-2"
                              type="checkbox"
                              placeholder="Is Billing"
                              name="isBilling"
                              defaultChecked={true}
                              disabled={true}
                            />
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Is Delivery:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              className="ml-2"
                              type="checkbox"
                              placeholder="Is Delivery"
                              name="isDelivery"
                              defaultChecked={true}
                              disabled={true}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row className="d-flex justify-content-end">
                        <Button className="mb-2  mr-3 " color="success">
                          Next
                        </Button>
                      </Row>
                    </Col>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  PaymentTermData: state.AppSetting.PaymentTermData,
  PaymentMethodData: state.AppSetting.PaymentMethodData,
  CustomerTypeData: state.AppSetting.CustomerTypeData,
  CountryData: state.AppSetting.CountryData,
  CurrencyData: state.AppSetting.CurrencyData,
  RegionData: state.AppSetting.RegionData,
  TaxData: state.AppSetting.TaxData,
  AddToAddressData: state.StakeHolderSetting.AddToAddressData,

  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_CUSTOMER: (Cus) => dispach(AddCustomer(Cus)),
    ADD_ADDRESS: (address) => dispach(AddAddress(address)),
    GET_COUNTRY_DATA: () => dispach(getCountry()),

    GET_REGION_DATA: () => dispach(getRegion()),
    GET_TAX_DATA: () => dispach(getTaxData()),
    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(StakeholderAddress);
