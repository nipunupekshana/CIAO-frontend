/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateParameter,
  deletePara,
  getParameterData
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

class OverViewParameterData extends Component {
  state = {
    modal: false,
    IsTrue: false,

    DataTypeisOpen: false,

    id: null,
    Name: "",
    Description: "",
    Data: "",

    DataTypedropDownValue: "Please Select!",
    checked: false,

    visibilityUpdate: false,
    visibilityDelete: false,
    msg: null
  };
  componentDidMount() {
    this.props.GET_PARAMETER_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, ParaUpdateStatus } = this.props;

    if (
      ParaUpdateStatus !== prevProps.ParaUpdateStatus &&
      ParaUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_PARAMETER_UNSUCCESS") {
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

  DataTypetoggle() {
    this.setState({ DataTypeisOpen: !this.state.DataTypeisOpen, Data: "" });
  }
  handleDate(e) {
    this.setState({ Data: e.target.value });
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

    this.props.DELETE_PARA(id);
  }

  updateRaw = (id) => {
    if (id.DataType === "LOGICAL") {
      if (id.Value === "True") {
        this.setState({ IsTrue: true });
      } else if (id.Value === "True") {
        this.setState({ IsTrue: false });
      }
    }

    console.log(id);

    if (id) {
      this.setState({
        id: id.id,
        Name: id.name,
        Description: id.Description,
        DataTypedropDownValue: id.DataType,
        Data: id.Value
      });
    }

    this.modeltoggle();
  };

  changeValue(e, name) {
    console.log(e.target.name);

    if (e.target.name === "ProId") {
      this.setState({
        [e.target.name]: e.target.id,
        ProductdropDownValue: name
      });
    }
    if (e.target.name === "shelfId") {
      this.setState({
        [e.target.name]: e.target.id,
        ShelfdropDownValue: name
      });
    }
    if (e.target.name === "DelId") {
      this.setState({
        [e.target.name]: e.target.id,
        DeliverydropDownValue: name
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let value;
    const { id, Name, Description, Data, DataTypedropDownValue } = this.state;
    value = Data;

    if (!Name || DataTypedropDownValue === "Please Select!") {
      this.setState({ msg: "Please Fil All Data!" });
    } else {
      if (DataTypedropDownValue === "LOGICAL") {
        if (this.state.IsTrue) {
          value = "True";
        } else {
          value = "False";
        }
      }
      this.setState({ msg: null });
      const newParameter = {
        id,
        Name,
        Description,
        value,
        DataTypedropDownValue
      };
      console.log(Name, Description, DataTypedropDownValue, value);
      this.props.UPDATE_PARAMETER(newParameter);
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
        accessor: "Description",
        sortable: true,
        filterable: true
      },
      {
        Header: "DataType",
        accessor: "DataType",
        sortable: true,
        filterable: true
      },
      {
        Header: "Value ",
        accessor: "Value",
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
                              placeholder="Name"
                              name="Name"
                              value={this.state.Name}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <Col>
                            <b>Description:</b>
                          </Col>
                          <Col>
                            <Input
                              type="textarea"
                              placeholder="Description"
                              name="Description"
                              value={this.state.Description}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <Col>
                            <b>Data Type : </b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.DataTypeisOpen}
                              toggle={() => {
                                this.DataTypetoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.DataTypedropDownValue}
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
                                  name="INT"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "INT",
                                      type: "number"
                                    })
                                  }
                                >
                                  INT
                                </DropdownItem>
                                <DropdownItem
                                  name="STRING"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "STRING",
                                      type: "text"
                                    })
                                  }
                                >
                                  STRING
                                </DropdownItem>
                                <DropdownItem
                                  name="DECIMAL"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "DECIMAL",
                                      type: "number",
                                      min: 0
                                    })
                                  }
                                >
                                  DECIMAL
                                </DropdownItem>
                                <DropdownItem
                                  name="LOGICAL"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "LOGICAL",
                                      type: "checkbox"
                                    })
                                  }
                                >
                                  LOGICAL
                                </DropdownItem>
                                <DropdownItem
                                  name="DATE"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "DATE"
                                    })
                                  }
                                >
                                  DATE
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row className="mb-3">
                        <Col
                          className="animated fadeIn "
                          hidden={
                            this.state.DataTypedropDownValue ===
                            "Please Select!"
                              ? true
                              : false
                          }
                        >
                          <b>Data:</b>
                        </Col>
                        <Col>
                          {this.state.DataTypedropDownValue === "INT" ? (
                            <Input
                              type="number"
                              name="Data"
                              placeholder="INT"
                              value={this.state.Data}
                              onChange={(e) =>
                                this.setState({ Data: e.target.value })
                              }
                            ></Input>
                          ) : this.state.DataTypedropDownValue === "STRING" ? (
                            <Input
                              type="text"
                              name="Data"
                              value={this.state.Data}
                              placeholder="STRING"
                              onChange={(e) =>
                                this.setState({ Data: e.target.value })
                              }
                            ></Input>
                          ) : this.state.DataTypedropDownValue === "DECIMAL" ? (
                            <Input
                              type="number"
                              name="Data"
                              min="0"
                              value={this.state.Data}
                              placeholder="DECIMAL"
                              onChange={(e) =>
                                this.setState({ Data: e.target.value })
                              }
                            ></Input>
                          ) : this.state.DataTypedropDownValue === "LOGICAL" ? (
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
                          ) : this.state.DataTypedropDownValue === "DATE" ? (
                            <Input
                              type="date"
                              defaultValue={this.state.Data}
                              onChange={(e) => this.handleDate(e)}
                            />
                          ) : null}
                        </Col>
                      </Row>

                      <Button block color="success">
                        Update Item
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
                <i className="fa fa-align-justify"></i> Parameter Overview
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.ParamData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.ParamData}
                    defaultPageSize={10}
                    noDataText={"No Parameter Overview Data Available"}
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
  ParamData: state.AppSetting.ParamData,

  ParaUpdateStatus: state.AppSetting.ParaUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_PARAMETER: (ItemUpdate) => dispach(updateParameter(ItemUpdate)),
    DELETE_PARA: (id) => dispach(deletePara(id)),
    GET_PARAMETER_DATA: () => dispach(getParameterData()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(OverViewParameterData);
