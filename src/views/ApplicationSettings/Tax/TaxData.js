/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateVat,
  deleteTax,
  getTaxData
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
  Alert
} from "reactstrap";

class TaxData extends Component {
  state = {
    PriotiryisOpen: false,
    modal: false,
    IsTrue: false,

    id: null,
    Name: "",
    Description: "",

    Percentage: null,

    PriotirydropDownValue: "Please Select!",

    visibilityUpdate: false,
    visibilityDelete: false,
    msg: null
  };
  componentDidMount() {
    this.props.GET_TAX_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, TaxUpdateStatus } = this.props;

    if (
      TaxUpdateStatus !== prevProps.TaxUpdateStatus &&
      TaxUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_TAX_UNSUCCESS") {
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

  Priotirytoggle() {
    this.setState({ PriotiryisOpen: !this.state.PriotiryisOpen });
  }
  GetPermissionStatus = (id) => {
    if (id == "True") {
      return true;
    } else {
      return false;
    }
  };

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_TAX(id);
  }

  updateRaw = (id) => {
    if (id.taxOnTax === "True") {
      this.setState({ IsTrue: true });
    } else {
      this.setState({ IsTrue: false });
    }
    console.log(id);

    if (id) {
      this.setState({
        id: id.id,
        Name: id.name,
        Description: id.description,
        PriotirydropDownValue: id.priority,
        Percentage: id.percentage
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let value;
    const {
      id,
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

      this.setState({ msg: null });
      const newTax = {
        id,
        Name,
        PriotirydropDownValue,
        Description,
        Percentage,
        TaxOnTax
      };
      console.log(
        id,
        Name,
        PriotirydropDownValue,
        Description,
        Percentage,
        TaxOnTax
      );
      this.props.UPDATE_TAX(newTax);
    }
  };

  render() {
    const coulmns = [
      {
        Header: " Name",
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "Description",
        accessor: "description",
        sortable: true,
        filterable: true
      },
      {
        Header: "Priority",
        accessor: "priority",
        sortable: true,
        filterable: true
      },
      {
        Header: "Percentage ",
        accessor: "percentage",
        sortable: true,
        filterable: true
      },
      {
        Header: "Tax On Tax",
        accessor: "taxOnTax",
        sortable: true,
        filterable: true
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
              Update Parameter Data
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
                            <b>Name:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Tax Name"
                              name="Name"
                              value={this.state.Name}
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
                              value={this.state.Percentage}
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
                              value={this.state.Description}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Button block color="success">
                        Update Tax
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
                <i className="fa fa-align-justify"></i> Tax Options
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.TaxData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.TaxData}
                    defaultPageSize={10}
                    noDataText={"No Tax Data Available"}
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
  TaxData: state.AppSetting.TaxData,

  TaxUpdateStatus: state.AppSetting.TaxUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_TAX: (VATUpdate) => dispach(updateVat(VATUpdate)),
    DELETE_TAX: (id) => dispach(deleteTax(id)),
    GET_TAX_DATA: () => dispach(getTaxData()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(TaxData);
