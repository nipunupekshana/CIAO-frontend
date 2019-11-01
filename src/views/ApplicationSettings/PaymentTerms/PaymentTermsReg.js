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
import { AddPaymentTerm } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import PaymentTermsData from "./PaymentTermsData";
class PaymentTermsReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modal: false,

      Name: "",
      duePeriod: null,

      msg: null
    };
  }

  componentDidUpdate(prevProps) {
    const { error, PaymentTermStatus } = this.props;

    if (
      PaymentTermStatus !== prevProps.PaymentTermStatus &&
      PaymentTermStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_PAYMENT_TERM_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      Name: null,
      duePeriod: null
    });
    this.setState({ modal: !this.state.modal });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, duePeriod } = this.state;

    if (!Name || !duePeriod) {
      this.setState({ msg: "Please Fill Details!" });
    } else {
      this.setState({ msg: null });
      const PaymentTerm = {
        Name,
        duePeriod
      };
      console.log(Name);
      this.props.ADD_PAYMENT_TERM(PaymentTerm);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            Define a Payment Term
          </ModalHeader>

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
                            <b>Due Period:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="Due Period"
                              name="duePeriod"
                              min="0"
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
              Define Payment Term
            </Button>
          </Row>
          <PaymentTermsData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  PaymentTermStatus: state.AppSetting.PaymentTermStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_PAYMENT_TERM: (PTerm) => dispach(AddPaymentTerm(PTerm)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(PaymentTermsReg);
