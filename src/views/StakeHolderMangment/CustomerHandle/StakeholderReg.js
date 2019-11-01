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
  getCustomerType,
  getCountry,
  getCurrency,
  getPaymentMethod,
  getPaymentTerm,
  getRegion,
  getTaxData
} from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import {
  AddCustomer,
  addToAddress
} from "./../../../actions/StakeholderAction";

class StakeholderReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      CusTypeisOpen: false,
      CusTypeDownValue: "Please Select!",
      modal: false,

      Name: "",
      customerTypeId: null,

      nick: null,
      name: null,
      name2: null,
      counrtyId: null,
      countryName: null,
      tel1: null,
      tel2: null,
      fax: null,
      email: null,
      web: null,
      currencyId: null,
      taxOptionId: null,
      paymentMethodId: null,
      paymentTermsId: null,
      incomeTaxNo: null,
      businessRegNo: null,
      isActive: null,
      note: null,
      SVat: null,
      regionId: null,
      regionName: null,
      customerDiscount: null,

      msg: null
    };
  }

  componentDidMount() {
    this.props.GET_CUSTOMER_TYPE();
    this.props.GET_COUNTRY_DATA();
    this.props.GET_REGION_DATA();
    this.props.GET_CURRENCY_DATA();
    this.props.GET_PAYMENT_METHOD_DATA();
    this.props.GET_PAYMENT_TERM_DATA();

    this.props.GET_TAX_DATA();
  }
  componentDidUpdate(prevProps) {
    const { error, AddCusStatus } = this.props;

    if (AddCusStatus !== prevProps.AddCusStatus && AddCusStatus === true) {
      this.props.history.push("/CustomerData/CustomerReg/CustomerAddress");
    }

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

    if (name === "customerTypeId") {
      if (e !== null) {
        this.setState({
          customerTypeId: e.value
        });
      } else {
        this.setState({
          customerTypeId: ""
        });
      }
    }

    if (name === "counrtyId") {
      if (e !== null) {
        this.setState({
          counrtyId: e.value,
          countryName: e.label
        });
      } else {
        this.setState({
          counrtyId: ""
        });
      }
    }

    if (name === "currencyId") {
      if (e !== null) {
        this.setState({
          currencyId: e.value
        });
      } else {
        this.setState({
          currencyId: ""
        });
      }
    }

    if (name === "paymentMethodId") {
      if (e !== null) {
        this.setState({
          paymentMethodId: e.value
        });
      } else {
        this.setState({
          paymentMethodId: ""
        });
      }
    }

    if (name === "paymentTermsId") {
      if (e !== null) {
        this.setState({
          paymentTermsId: e.value
        });
      } else {
        this.setState({
          paymentTermsId: ""
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
          regionId: ""
        });
      }
    }

    if (name === "taxOptionId") {
      if (e !== null) {
        let data = [];
        e.map((val) => {
          data = [...data, val.value];
        });
        this.setState({
          taxOptionId: [...data]
        });
      } else {
        this.setState({
          taxOptionId: ""
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
      customerTypeId,
      nick,
      name,
      name2,
      counrtyId,
      countryName,

      tel1,
      tel2,
      fax,
      email,
      web,
      currencyId,

      paymentMethodId,
      paymentTermsId,
      incomeTaxNo,
      businessRegNo,

      note,
      SVat,
      regionId,
      regionName,
      customerDiscount,
      taxOptionId
    } = this.state;

    const regCustomer = {
      customerTypeId,
      nick,
      name,
      name2,
      counrtyId,

      tel1,
      tel2,
      fax,
      email,
      web,
      currencyId,

      paymentMethodId,
      paymentTermsId,
      incomeTaxNo,
      businessRegNo,

      note,
      SVat,
      regionId,
      customerDiscount,
      taxOptionId
    };
    this.props.ADD_CUSTOMER(regCustomer);

    const AddedToAddress = {
      name,
      counrtyId,
      countryName,
      regionId,
      regionName
    };
    this.props.ADD_TO_ADDRESS(AddedToAddress);

    console.log(
      customerTypeId,
      nick,
      name,
      name2,
      counrtyId,

      tel1,
      tel2,
      fax,
      email,
      web,
      currencyId,

      paymentMethodId,
      paymentTermsId,
      incomeTaxNo,
      businessRegNo,

      note,
      SVat,
      regionId,
      customerDiscount,
      taxOptionId
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
                            <b>Customer Type:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              options={this.props.CustomerTypeData}
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) =>
                                this.changeValue(e, "customerTypeId")
                              }
                            ></Select>
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Nik Name:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              required
                              type="text"
                              placeholder="Nik Name"
                              name="nick"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Name:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              required
                              type="text"
                              placeholder="Name"
                              name="name"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Name 2:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="text"
                              placeholder="Name 2"
                              name="name2"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Country Name:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              options={
                                this.props.CountryData
                                  ? this.props.CountryData
                                  : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) => this.changeValue(e, "counrtyId")}
                            ></Select>
                          </Col>
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Currency:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              options={
                                this.props.CurrencyData
                                  ? this.props.CurrencyData
                                  : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) =>
                                this.changeValue(e, "currencyId")
                              }
                            ></Select>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Tel No 1:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="number"
                              required
                              placeholder="TelePhone No 1"
                              name="tel1"
                              min="0"
                              maxLength="10"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Tel No 2:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="number"
                              placeholder="TelePhone No 2"
                              name="tel2"
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
                            <b>Email:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="email"
                              required
                              placeholder="Email"
                              name="email"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Fax:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="number"
                              placeholder="Fax"
                              name="fax"
                              min="0"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Web Site:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="text"
                              placeholder="Web Site"
                              name="web"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Note:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="text"
                              placeholder="Note"
                              name="note"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>payment Method:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              options={
                                this.props.PaymentMethodData
                                  ? this.props.PaymentMethodData
                                  : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) =>
                                this.changeValue(e, "paymentMethodId")
                              }
                            ></Select>
                          </Col>
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>payment Terms:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              options={
                                this.props.PaymentTermData
                                  ? this.props.PaymentTermData
                                  : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) =>
                                this.changeValue(e, "paymentTermsId")
                              }
                            ></Select>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Business Reg No:</b>
                          </Col>
                          <Col xs="3" sm="4" md="2" lg="4" xl="4">
                            <Input
                              type="number"
                              required
                              placeholder="Business Reg No"
                              name="businessRegNo"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Income Tax No:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="text"
                              required
                              placeholder="Income Tax No"
                              name="incomeTaxNo"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-2">
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>SVat:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="text"
                              placeholder="SVat"
                              name="SVat"
                              onChange={this.onChange}
                            />
                          </Col>
                          <Col xs="4" sm="4" md="4" lg="2" xl="2">
                            <b>Customer Discount:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Input
                              type="number"
                              placeholder="Customer Discount"
                              name="customerDiscount"
                              step="0.10"
                              min="0"
                              onChange={this.onChange}
                            />
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
                          <Col xs="5" sm="4" md="2" lg="2" xl="2">
                            <b>Tax Option:</b>
                          </Col>
                          <Col xs="7" sm="8" md="10" lg="4" xl="4">
                            <Select
                              closeMenuOnSelect={false}
                              isMulti
                              options={
                                this.props.TaxData ? this.props.TaxData : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) =>
                                this.changeValue(e, "taxOptionId")
                              }
                            ></Select>
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
  AddCusStatus: state.StakeHolderSetting.AddCusStatus,

  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_CUSTOMER: (Cus) => dispach(AddCustomer(Cus)),
    GET_CUSTOMER_TYPE: () => dispach(getCustomerType()),
    ADD_TO_ADDRESS: (data) => dispach(addToAddress(data)),
    GET_COUNTRY_DATA: () => dispach(getCountry()),
    GET_CURRENCY_DATA: () => dispach(getCurrency()),
    GET_PAYMENT_METHOD_DATA: () => dispach(getPaymentMethod()),
    GET_PAYMENT_TERM_DATA: () => dispach(getPaymentTerm()),
    GET_REGION_DATA: () => dispach(getRegion()),
    GET_TAX_DATA: () => dispach(getTaxData()),
    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(StakeholderReg);
