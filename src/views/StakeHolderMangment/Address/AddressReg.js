import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  Row,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import {
  AddPaymentTerm,
  getRegion,
  getCountry
} from "../../../actions/AuthApplicationSettingActions";
import { getCustomer, AddAddress } from "./../../../actions/StakeholderAction";
import { clearErrors } from "../../../actions/errorActions";
import AdressData from "./AdressData";

class AddressReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modal: false,

      Name: "",
      CustomerId: null,
      recipient: null,
      streetAddress1: null,
      streetAddress2: null,
      city: null,
      contactPerson: null,
      contactNumber: null,
      isBilling: false,
      isDelivery: false,
      countryId: null,
      countryName: null,
      regionId: null,
      regionName: null,
      msg: null
    };
  }

  componentDidMount() {
    this.props.GET_CUSTOMER();
    this.props.GET_COUNTRY_DATA();
    this.props.GET_REGION_DATA();
  }
  componentDidUpdate(prevProps) {
    const { error, CusAddressStatus } = this.props;

    if (
      CusAddressStatus !== prevProps.CusAddressStatus &&
      CusAddressStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_CUSTOMER_ADDRESS_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      Name: "",
      CustomerId: null,
      recipient: null,
      streetAddress1: null,
      streetAddress2: null,
      city: null,
      contactPerson: null,
      contactNumber: null,
      isBilling: false,
      isDelivery: false,
      countryId: null,
      countryName: null,
      regionId: null,
      regionName: null
    });
    this.setState({ modal: !this.state.modal });
  };

  changeValue(e, name) {
    console.log(e);
    console.log(name);

    if (name === "customerId") {
      if (e !== null) {
        this.setState({
          CustomerId: e.value
        });
      } else {
        this.setState({
          CustomerId: ""
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
          countryId: ""
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
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
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

    if (
      !CustomerId ||
      !countryId ||
      !recipient ||
      !streetAddress1 ||
      !city ||
      !contactPerson ||
      !contactNumber
    ) {
      this.setState({ msg: "Please Fill Details!" });
    } else {
      this.setState({ msg: null });
      const Address = {
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
      console.log(
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

      this.props.ADD_ADDRESS(Address);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Define a Address</ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col md="9" lg="11" xl="12">
                <Card className="mx-1">
                  <CardBody className="p-3">
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
                              options={
                                this.props.CustomerData
                                  ? this.props.CustomerData
                                  : ""
                              }
                              isSearchable={true}
                              isClearable={true}
                              onChange={(e) =>
                                this.changeValue(e, "customerId")
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

                      <Button color="success" block>
                        Create
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        <Container>
          <Row className="d-flex justify-content-end">
            <Button
              onClick={this.modeltoggle}
              className="mb-2  mr-3 "
              outline
              color="success"
            >
              Define New address
            </Button>
          </Row>
          <AdressData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  PaymentTermStatus: state.AppSetting.PaymentTermStatus,
  CustomerData: state.StakeHolderSetting.CustomerData,
  CountryData: state.AppSetting.CountryData,
  RegionData: state.AppSetting.RegionData,
  CusAddressStatus: state.StakeHolderSetting.CusAddressStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_PAYMENT_TERM: (PTerm) => dispach(AddPaymentTerm(PTerm)),
    GET_CUSTOMER: () => dispach(getCustomer()),
    GET_REGION_DATA: () => dispach(getRegion()),
    GET_COUNTRY_DATA: () => dispach(getCountry()),
    ADD_ADDRESS: (data) => dispach(AddAddress(data)),
    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(AddressReg);
