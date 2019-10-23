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
import { AddDeliveryType } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import DeliveryData from "./DeliveryData";

class DeliveryReg extends Component {
  constructor() {
    super();

    this.state = {
      WeightisOpen: false,
      isOpen: false,
      modal: false,

      IsApproxWeight: false,
      IsWeightRange: false,
      IsBundled: false,

      WeightdropDownValue: "Please Select!",
      Name: "",
      Weight: 0,
      Description: "",

      LowerWeight: 0,
      UpperWeight: 0,
      NoOfItems: 0,

      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error, DeliveryStatus } = this.props;

    if (
      DeliveryStatus !== prevProps.DeliveryStatus &&
      DeliveryStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_DELIVERY_TYPE_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      WeightdropDownValue: "Please Select!",
      Name: "",
      Weight: 0,
      Description: "",
      LowerWeight: 0,
      UpperWeight: 0,
      NoOfItems: 0
    });
    this.setState({ modal: !this.state.modal });
  };

  Weighttoggle() {
    this.setState({ WeightisOpen: !this.state.WeightisOpen });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let addStatus = false;

    const {
      WeightdropDownValue,
      Name,
      Weight,
      Description,
      LowerWeight,
      UpperWeight,
      NoOfItems,
      IsApproxWeight,
      IsWeightRange,
      IsBundled
    } = this.state;
    let Items = parseInt(NoOfItems);
    let lowWeight = parseFloat(LowerWeight);
    let UpWeight = parseFloat(UpperWeight);
    let Weght = parseFloat(Weight);

    if (WeightdropDownValue === "Please Select!") {
      addStatus = false;
      this.setState({ msg: "Please Select Weight unit! " });
    } else {
      addStatus = true;
      this.setState({ msg: null });
    }

    if (IsWeightRange) {
      ///IsWeightRange
      if (!lowWeight || !UpWeight) {
        addStatus = false;
        this.setState({ msg: "Please Set Weight Range! " });
      } else {
        addStatus = true;
        this.setState({ msg: null });

        if (UpWeight < lowWeight) {
          addStatus = false;
          this.setState({ msg: "Please Add Weight Correctly! " });
        } else {
          addStatus = true;
          this.setState({ msg: null });
        }
      }
    } else {
      lowWeight = 0;
      UpWeight = 0;
    }

    //IsBundled
    if (IsBundled) {
      if (!Items) {
        addStatus = false;
        this.setState({ msg: "Please Add No of Items! " });
      } else {
        addStatus = true;
        this.setState({ msg: null });
      }
    } else {
      Items = 0;
    }

    ///(IsApproxWeight && IsBundled
    if (IsApproxWeight && IsBundled) {
      if (!Items) {
        addStatus = false;
        this.setState({ msg: "Please Add No of Items! " });
      } else {
        addStatus = true;
        this.setState({ msg: null });
      }
    }

    ///IsWeightRange && IsBundled
    if (IsWeightRange && IsBundled) {
      if (!UpWeight || !lowWeight) {
        addStatus = false;
        this.setState({ msg: "Please Set Weight Range! " });
      } else {
        if (UpWeight < lowWeight) {
          addStatus = false;
          this.setState({ msg: "Please Add Weight Correctly! " });
        } else {
          if (!Items) {
            addStatus = false;
            this.setState({ msg: "Please Add No of Items! " });
          } else {
            addStatus = true;
            this.setState({ msg: null });
          }
        }
      }
    }

    const DeliveryType = {
      Name,
      Weght,
      WeightdropDownValue,
      Description,
      lowWeight,
      UpWeight,
      Items,
      IsApproxWeight,
      IsWeightRange,
      IsBundled
    };

    if (addStatus) {
      this.props.ADD_DELIVERY_TYPE(DeliveryType);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            Create a new Delivery Type
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
                            <b>Description:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Description"
                              name="Description"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Weight:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              step=".01"
                              placeholder="Weight"
                              name="Weight"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      {/* ///drop down Category// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Weight Unit</b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.WeightisOpen}
                              toggle={() => {
                                this.Weighttoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.WeightdropDownValue}
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      WeightdropDownValue: "Gram"
                                    })
                                  }
                                >
                                  Gram
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      WeightdropDownValue: "Kilogram"
                                    })
                                  }
                                >
                                  Kilogram
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row className="ml-1">
                        <Col hidden={this.state.IsWeightRange}>
                          <Input
                            type="checkbox"
                            id="Weight"
                            checked={this.state.IsApproxWeight}
                            name="Weight"
                            onChange={() => {
                              this.setState({
                                IsApproxWeight: !this.state.IsApproxWeight
                              });
                            }}
                          />
                          <Label htmlFor="Weight">Is Approx Weight</Label>
                        </Col>
                      </Row>

                      <Row className="ml-1">
                        <Col hidden={this.state.IsApproxWeight}>
                          <Input
                            type="checkbox"
                            name="IsWeightRange"
                            id="IsWeightRange"
                            checked={this.state.IsWeightRange}
                            onChange={() => {
                              this.setState({
                                IsWeightRange: !this.state.IsWeightRange
                              });
                            }}
                          />
                          <Label htmlFor="IsWeightRange">Is Weight Range</Label>
                        </Col>
                      </Row>

                      <Row
                        hidden={
                          !this.state.IsWeightRange || this.state.IsApproxWeight
                        }
                      >
                        <Col>
                          <Label className="text-muted"> Lower Weight:</Label>
                        </Col>
                        <InputGroup className="mb-3">
                          <Col>
                            <Input
                              type="number"
                              step=".01"
                              placeholder="Lower Weight"
                              name="LowerWeight"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row
                        hidden={
                          !this.state.IsWeightRange || this.state.IsApproxWeight
                        }
                      >
                        <Col>
                          <Label className="text-muted"> Upper Weight:</Label>
                        </Col>
                        <InputGroup className="mb-3">
                          <Col>
                            <Input
                              type="number"
                              step=".01"
                              placeholder="Upper Weight"
                              name="UpperWeight"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row className="ml-1">
                        <Col>
                          <Input
                            type="checkbox"
                            name="IsBundled"
                            id="IsBundled"
                            checked={this.state.IsBundled}
                            onChange={() => {
                              this.setState({
                                IsBundled: !this.state.IsBundled
                              });
                            }}
                          />
                          <Label htmlFor="IsBundled">Is Bundled</Label>
                        </Col>
                      </Row>
                      <Row hidden={!this.state.IsBundled}>
                        <Col>
                          <Label className="text-muted"> No Of Items:</Label>
                        </Col>
                        <InputGroup className="mb-3">
                          <Col>
                            <Input
                              type="number"
                              step=".01"
                              placeholder="No Of Items"
                              name="NoOfItems"
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
          <Row className="d-flex justify-content-end ">
            <Button
              onClick={this.modeltoggle}
              className="mb-2  mr-3 "
              outline
              color="success"
            >
              Create Delivery Type
            </Button>
          </Row>
          <DeliveryData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  DeliveryStatus: state.AppSetting.DeliveryStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_DELIVERY_TYPE: (DeliveryType) => dispach(AddDeliveryType(DeliveryType)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DeliveryReg);
