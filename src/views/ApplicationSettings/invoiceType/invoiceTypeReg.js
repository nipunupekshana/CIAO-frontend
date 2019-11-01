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
import { AddInvoice } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import CustomerTypeData from "./invoiceTypeData";
class invoiceTypeReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modal: false,

      Name: "",
      suffix: null,
      nextNumber: null,

      msg: null
    };
  }

  componentDidUpdate(prevProps) {
    const { error, InvoiceStatus } = this.props;

    if (InvoiceStatus !== prevProps.InvoiceStatus && InvoiceStatus === true) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_INVOICE_FAIL") {
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
      suffix: null,
      nextNumber: null
    });
    this.setState({ modal: !this.state.modal });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, suffix, nextNumber } = this.state;

    if (!Name || !suffix || !nextNumber) {
      this.setState({ msg: "Please Fill Invoice Data!" });
    } else {
      this.setState({ msg: null });
      const InvoiceData = { Name, suffix, nextNumber };
      console.log(Name);
      this.props.ADD_INVOICE(InvoiceData);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            Define a Invoice Type
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
                            <b>Suffix:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Suffix"
                              name="suffix"
                              maxLength="1"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Next Number:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="Next Number"
                              name="nextNumber"
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
              Define Invoice Type
            </Button>
          </Row>
          <CustomerTypeData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  InvoiceStatus: state.AppSetting.InvoiceStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_INVOICE: (invoice) => dispach(AddInvoice(invoice)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(invoiceTypeReg);
