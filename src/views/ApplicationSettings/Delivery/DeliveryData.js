/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateDelivery,
  deleteDelivery,
  getDeliveryData
} from "./../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  Container,
  Input,
  InputGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Label
} from "reactstrap";

class DeliveryData extends Component {
  state = {
    modal: false,
    rawid: null,
    WeightUnitisOpen: false,

    IsApproxWeight: false,
    IsWeightRange: false,
    IsBundled: false,

    Name: "",
    Weight: 0,
    Description: "",

    LowerWeight: 0,
    UpperWeight: 0,
    NoOfItems: 0,

    WeightUnitdropDownValue: "Please Select!",

    visibilityUpdate: false,
    visibilityDelete: false,
    msg: null
  };
  componentDidMount() {
    this.props.GET_DELIVERY_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, DeliveryUpdateStatus } = this.props;

    if (
      DeliveryUpdateStatus !== prevProps.DeliveryUpdateStatus &&
      DeliveryUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_DELIVERY_DATA_UNSUCCESS") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({ msg: null });
    this.setState({ modal: !this.state.modal });
  };

  Categorytoggle() {
    this.setState({ WeightUnitisOpen: !this.state.WeightUnitisOpen });
  }

  GetPermissionStatus = (id) => {
    if (id == 1) {
      return true;
    } else {
      return false;
    }
  };

  GetPermissionToNumber = (id) => {
    if (id == true) {
      return 1;
    } else {
      return 0;
    }
  };

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_DELIVERY(id);
  }

  updateRaw = (id) => {
    console.log(id);
    let isbundled = this.GetPermissionStatus(id.isBundled);
    let aproxyStatus = this.GetPermissionStatus(id.isApproximateWeight);
    let iswhtRange = this.GetPermissionStatus(id.isWeightRange);
    if (id) {
      this.setState({
        id: id.id,
        Name: id.name,
        Description: id.description,
        WeightUnitdropDownValue: id.weightUnit,
        IsApproxWeight: aproxyStatus,
        IsWeightRange: iswhtRange,
        IsBundled: isbundled,
        Weight: id.weight,
        LowerWeight: id.lowerWeight,
        UpperWeight: id.upperWeight,
        NoOfItems: id.noOfItems
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let updateStatus = false;
    const IsApproxWeight = this.GetPermissionToNumber(
      this.state.IsApproxWeight
    );
    const IsWeightRange = this.GetPermissionToNumber(this.state.IsWeightRange);
    const IsBundled = this.GetPermissionToNumber(this.state.IsBundled);

    const {
      id,
      WeightUnitdropDownValue,
      Name,
      Weight,
      Description,
      LowerWeight,
      UpperWeight,
      NoOfItems
    } = this.state;

    let Items = parseInt(NoOfItems);
    let lowWeight = parseFloat(LowerWeight);
    let UpWeight = parseFloat(UpperWeight);
    let Weght = parseFloat(Weight);

    if (WeightUnitdropDownValue === "Please Select!") {
      updateStatus = false;
      this.setState({ msg: "Please Select Weight unit! " });
    } else {
      updateStatus = true;
      this.setState({ msg: null });
    }

    if (IsWeightRange) {
      ///IsWeightRange
      if (!lowWeight || !UpWeight) {
        updateStatus = false;
        this.setState({ msg: "Please Set Weight Range! " });
      } else {
        updateStatus = true;
        this.setState({ msg: null });

        if (UpWeight < lowWeight) {
          updateStatus = false;
          this.setState({
            msg: "Please Add Weight Correctly! "
          });
        } else {
          updateStatus = true;
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
        updateStatus = false;
        this.setState({ msg: "Please Add No of Items! " });
      } else {
        updateStatus = true;
        this.setState({ msg: null });
      }
    } else {
      Items = 0;
    }

    ///(IsApproxWeight && IsBundled
    if (IsApproxWeight && IsBundled) {
      if (!Items) {
        updateStatus = false;
        this.setState({ msg: "Please Add No of Items! " });
      } else {
        updateStatus = true;
        this.setState({ msg: null });
      }
    }

    ///IsWeightRange && IsBundled
    if (IsWeightRange && IsBundled) {
      if (!UpWeight || !lowWeight) {
        updateStatus = false;
        this.setState({ msg: "Please Set Weight Range! " });
      } else {
        updateStatus = true;
        if (UpWeight < lowWeight) {
          updateStatus = false;
          this.setState({
            msg: "Please Add Weight Correctly! "
          });
        } else {
          updateStatus = true;
          if (!Items) {
            updateStatus = false;
            this.setState({
              msg: "Please Add No of Items! "
            });
          } else {
            updateStatus = true;

            this.setState({ msg: null });
          }
        }
      }
    }

    const DeliveryTypeUpdate = {
      id,
      Name,
      Weght,
      WeightUnitdropDownValue,
      Description,
      lowWeight,
      UpWeight,
      Items,
      IsApproxWeight,
      IsWeightRange,
      IsBundled
    };
    if (updateStatus) {
      this.props.UPDATE_DELIVERY_DATA(DeliveryTypeUpdate);
    }
  };

  render() {
    const coulmns = [
      {
        Header: "Name",
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "Delivery Description",
        accessor: "description",
        sortable: false,
        filterable: false
      },
      {
        Header: "Action",
        Cell: (props) => {
          return (
            <div>
              <Button
                className="mr-2"
                color="danger"
                disabled={this.state.visibilityDelete}
                onClick={() => {
                  this.deleteRaw(props.original.id);
                }}
              >
                Delete
              </Button>
              <Button
                color="info"
                disabled={this.state.visibilityUpdate}
                onClick={() => {
                  this.updateRaw(props.original);
                }}
              >
                Update
              </Button>
            </div>
          );
        },
        sortable: false,
        filterable: false,
        width: 160,
        maxWidth: 160,
        minWidth: 40
      }
    ];

    return (
      <div className="animated fadeIn">
        <div>
          <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
            <ModalHeader toggle={this.modeltoggle}>
              Update Delivery Data
            </ModalHeader>
            <ModalBody>
              <Container>
                <Card className="mx-1 ">
                  <CardBody className="p-4  ">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-2">Delivery ID</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              name="id"
                              className="form-control  "
                              id="id"
                              value={this.state.id ? this.state.id : ""}
                              disabled={true}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Name:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              name="Name"
                              className="form-control "
                              id="DeliveryName"
                              onChange={this.onChange}
                              value={this.state.Name ? this.state.Name : ""}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4"> Description:</b>
                          </Col>

                          <Col>
                            <Input
                              type="textarea"
                              name="Description"
                              className="form-control"
                              id="Description"
                              onChange={this.onChange}
                              value={
                                this.state.Description
                                  ? this.state.Description
                                  : ""
                              }
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4"> Weight:</b>
                          </Col>

                          <Col>
                            <Input
                              type="number"
                              name="Weight"
                              step=".01"
                              className="form-control"
                              id="Weight"
                              onChange={this.onChange}
                              value={this.state.Weight ? this.state.Weight : ""}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        {/* ///drop down Category// */}

                        <InputGroup className="mb-3">
                          <Col>
                            <b>Weight Unit</b>
                          </Col>

                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.WeightUnitisOpen}
                              toggle={() => {
                                this.Categorytoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.WeightUnitdropDownValue}
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      WeightUnitdropDownValue: "Gram"
                                    })
                                  }
                                >
                                  Gram
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      WeightUnitdropDownValue: "Kilogram"
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
                            id="Weightchk"
                            checked={this.state.IsApproxWeight}
                            name="Weight"
                            onChange={() => {
                              this.setState({
                                IsApproxWeight: !this.state.IsApproxWeight
                              });
                            }}
                          />
                          <Label htmlFor="Weightchk">Is Approx Weight</Label>
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
                              value={this.state.LowerWeight}
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
                              value={this.state.UpperWeight}
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
                              value={this.state.NoOfItems}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Button block color="success">
                        Update Delivery
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Container>
            </ModalBody>
          </Modal>
        </div>

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Delivery
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.DeliveryData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.DeliveryData}
                    defaultPageSize={10}
                    noDataText={"No Delivery Data Available"}
                  ></ReactTable>
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  DeliveryData: state.AppSetting.DeliveryData,
  DeliveryUpdateStatus: state.AppSetting.DeliveryUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_DELIVERY_DATA: (DeliveryTypeUpdate) =>
      dispach(updateDelivery(DeliveryTypeUpdate)),
    DELETE_DELIVERY: (id) => dispach(deleteDelivery(id)),
    GET_DELIVERY_DATA: () => dispach(getDeliveryData()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(DeliveryData);
