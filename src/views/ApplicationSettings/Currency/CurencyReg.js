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
import { AddCurrency } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import Currencydata from "./Currencydata";

class CurencyReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modal: false,

      Name: "",
      abbreviation: "",
      buyRate: null,
      sellrate: null,
      msg: null,
      decimalPlaces: null
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error, CurrencyStatus } = this.props;

    if (
      CurrencyStatus !== prevProps.CurrencyStatus &&
      CurrencyStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_CURRENCY_FAIL") {
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
      Abbreviation: "",
      buyRate: null,
      sellrate: null,
      decimalPlaces: null
    });
    this.setState({ modal: !this.state.modal });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, abbreviation, buyRate, sellrate, decimalPlaces } = this.state;

    if (!Name || !abbreviation || !buyRate || !sellrate || !decimalPlaces) {
      this.setState({ msg: "Please Fill All Data" });
    } else {
      this.setState({ msg: null });
      const CurrencyData = {
        Name,
        abbreviation,
        buyRate,
        sellrate,
        decimalPlaces
      };

      console.log(Name, abbreviation, buyRate, sellrate, decimalPlaces);
      this.props.ADD_CURRENCY(CurrencyData);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Define a Country</ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col md="9" lg="8" xl="12">
                <Card className="mx-1">
                  <CardBody className="p-3">
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
                              onChange={this.onChange}
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
              Define Country
            </Button>
          </Row>
          <Currencydata />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  CurrencyStatus: state.AppSetting.CurrencyStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_CURRENCY: (CurrencyType) => dispach(AddCurrency(CurrencyType)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CurencyReg);
