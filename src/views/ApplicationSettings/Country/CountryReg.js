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
import { AddCountry } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";

import CountryData from "./CountryData";
class CountryReg extends Component {
  constructor() {
    super();

    this.state = {
      PriotiryisOpen: false,
      isOpen: false,
      modal: false,

      Name: "",
      Abbreviation: "",

      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error, CountryStatus } = this.props;

    if (CountryStatus !== prevProps.CountryStatus && CountryStatus === true) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_COUNTRY_FAIL") {
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
      Abbreviation: ""
    });
    this.setState({ modal: !this.state.modal });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, Abbreviation } = this.state;

    if (!Name || !Abbreviation) {
      this.setState({ msg: "Please Fill All Data" });
    } else {
      this.setState({ msg: null });
      const CountryType = {
        Name,
        Abbreviation
      };

      console.log(Name, Abbreviation);
      this.props.ADD_COUNTRY(CountryType);
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
                            <b>Country Name:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Country Name"
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
                              name="Abbreviation"
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
          <CountryData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  CountryStatus: state.AppSetting.CountryStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_COUNTRY: (TaxType) => dispach(AddCountry(TaxType)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CountryReg);
