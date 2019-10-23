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
  DropdownToggle,
  Label
} from "reactstrap";
import { connect } from "react-redux";
import { AddTaxType } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import TaxData from "./TaxData";
class TaxReg extends Component {
  constructor() {
    super();

    this.state = {
      PriotiryisOpen: false,
      isOpen: false,
      modal: false,

      PriotirydropDownValue: "Please Select!",
      Name: "",
      IsTrue: false,

      Description: "",
      Percentage: null,

      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error, TaxStatus } = this.props;

    if (TaxStatus !== prevProps.TaxStatus && TaxStatus === true) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_TAX_TYPE_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      PriotirydropDownValue: "Please Select!",
      Name: "",
      Description: "",
      Percentage: null,
      IsTrue: false
    });
    this.setState({ modal: !this.state.modal });
  };

  Priotirytoggle() {
    this.setState({ PriotiryisOpen: !this.state.PriotiryisOpen });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      PriotirydropDownValue,
      Name,
      Description,
      Percentage,
      IsTrue
    } = this.state;
    let TaxOnTax = "False";

    if (!Name || PriotirydropDownValue === "Please Select!" || !Percentage) {
      this.setState({ msg: "Please Fill All Data!" });
    } else {
      this.setState({ msg: null });
      if (IsTrue) {
        TaxOnTax = "True";
      } else {
        TaxOnTax = "False";
      }

      const TaxType = {
        Name,
        PriotirydropDownValue,
        Description,
        Percentage,
        TaxOnTax
      };

      console.log(
        Name,
        PriotirydropDownValue,
        Description,
        Percentage,
        TaxOnTax
      );
      this.props.ADD_TAX_TYPE(TaxType);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            Create a Tax Option
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
                              placeholder="Tax Name"
                              name="Name"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      {/* ///drop down Category// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Priority:</b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.PriotiryisOpen}
                              toggle={() => {
                                this.Priotirytoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.PriotirydropDownValue}
                              </DropdownToggle>
                              <DropdownMenu
                                right
                                modifiers={{
                                  setMaxHeight: {
                                    enabled: true,
                                    order: 890,
                                    fn: (data) => {
                                      return {
                                        ...data,
                                        styles: {
                                          ...data.styles,
                                          overflow: "auto",
                                          maxHeight: 250
                                        }
                                      };
                                    }
                                  }
                                }}
                              >
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 1
                                    })
                                  }
                                >
                                  1
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 2
                                    })
                                  }
                                >
                                  2
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 3
                                    })
                                  }
                                >
                                  3
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 4
                                    })
                                  }
                                >
                                  4
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 5
                                    })
                                  }
                                >
                                  5
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 6
                                    })
                                  }
                                >
                                  6
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 7
                                    })
                                  }
                                >
                                  7
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 8
                                    })
                                  }
                                >
                                  8
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 9
                                    })
                                  }
                                >
                                  9
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      PriotirydropDownValue: 10
                                    })
                                  }
                                >
                                  10
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Percentage(%):</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Tax Percentage"
                              name="Percentage"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Tax On Tax :</b>
                          </Col>
                          <Col>
                            <Input
                              className="ml-1"
                              type="checkbox"
                              id="bool"
                              checked={this.state.IsTrue}
                              onChange={() => {
                                this.setState({
                                  IsTrue: !this.state.IsTrue
                                });
                              }}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Tax Discription:</b>
                          </Col>
                          <Col>
                            <Input
                              type="textarea"
                              placeholder="Tax Discription:"
                              name="Description"
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
              Create Tax Type
            </Button>
          </Row>
          <TaxData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  TaxStatus: state.AppSetting.TaxStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_TAX_TYPE: (TaxType) => dispach(AddTaxType(TaxType)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(TaxReg);
