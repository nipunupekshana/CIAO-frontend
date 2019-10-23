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
  Alert,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { connect } from "react-redux";
import { AddShelf } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import ShelfLivesData from "./ShelfLivesData";
class ShelfLivesReg extends Component {
  constructor() {
    super();

    this.state = {
      TemperatureisOpenisOpen: false,
      isOpen: false,
      modal: false,

      TemperaturedropDownValue: "Please Select!",
      State: "",
      Temperature: "",

      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error, ShelfLivesRegStatus } = this.props;

    if (ShelfLivesRegStatus !== prevProps.ShelfLivesRegStatus) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_SHELF_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      TemperaturedropDownValue: "Please Select!",
      State: "",
      Temperature: ""
    });
    this.setState({ modal: !this.state.modal });
  };

  Temperaturetoggle() {
    this.setState({ TemperatureisOpen: !this.state.TemperatureisOpen });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { TemperaturedropDownValue, State, Temperature } = this.state;
    console.log(TemperaturedropDownValue, State, Temperature);
    const newShelfLive = {
      TemperaturedropDownValue,
      State,
      Temperature
    };

    this.props.ADD_SHELF(newShelfLive);
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            Create a new Shelf Life
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
                            <b>State:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="State"
                              name="State"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Temperature:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              step=".01"
                              placeholder="Temperature"
                              name="Temperature"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      {/* ///drop down Category// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Temperature Unit</b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.TemperatureisOpen}
                              toggle={() => {
                                this.Temperaturetoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.TemperaturedropDownValue}
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      TemperaturedropDownValue: "Celsius"
                                    })
                                  }
                                >
                                  Celsius
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      TemperaturedropDownValue: "Fahrenheit"
                                    })
                                  }
                                >
                                  Fahrenheit
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
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
          <Row className="d-flex justify-content-end ">
            <Button
              onClick={this.modeltoggle}
              className="mb-2  mr-3 "
              outline
              color="success"
            >
              Create Shelf Life
            </Button>
          </Row>
          <ShelfLivesData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ShelfLivesRegStatus: state.AppSetting.ShelfLivesRegStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_SHELF: (newShelfLive) => dispach(AddShelf(newShelfLive)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ShelfLivesReg);
