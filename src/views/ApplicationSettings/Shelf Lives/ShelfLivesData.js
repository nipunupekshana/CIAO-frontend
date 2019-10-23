/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateShelf,
  deleteShelf,
  getShelfData
} from "./../../../actions/AuthApplicationSettingActions";

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

class ShelfLivesData extends Component {
  state = {
    modal: false,
    rawid: null,
    TemperatureisOpen: false,

    id: null,
    State: null,
    Temperature: null,

    TemperaturedropDownValue: "Please Select!",

    visibilityUpdate: false,
    visibilityDelete: false
  };
  componentDidMount() {
    this.props.GET_SHELF_DATA();
  }

  modeltoggle = () => {
    //this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  Temperaturetoggle() {
    this.setState({ TemperatureisOpen: !this.state.TemperatureisOpen });
  }

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_SHELF(id);
  }

  updateRaw = (id) => {
    console.log(id);
    if (id) {
      this.setState({
        id: id.id,
        State: id.name,
        Temperature: id.temperature,
        TemperaturedropDownValue: id.temperatureUnit
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.modeltoggle();
    const { State, id, Temperature, TemperaturedropDownValue } = this.state;

    const newShelf = {
      State,
      id,
      Temperature,
      TemperaturedropDownValue
    };
    this.props.UPDATE_SHELF_DATA(newShelf);
  };

  render() {
    const coulmns = [
      {
        Header: "State",
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "Temperature",
        accessor: "temperature",
        sortable: false,
        filterable: false
      },
      {
        Header: "Temperature Unit",
        accessor: "temperatureUnit",
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
              Update ShelfLives Data
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
                            <b className="mr-2">ShelfLives ID</b>
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
                            <b className="mr-4">State:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              name="State"
                              className="form-control "
                              id="State"
                              onChange={this.onChange}
                              value={this.state.State ? this.state.State : ""}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Temperature:</b>
                          </Col>

                          <Col>
                            <Input
                              type="number"
                              name="Temperature"
                              step=".01"
                              className="form-control"
                              id="Temperature"
                              onChange={this.onChange}
                              value={
                                this.state.Temperature
                                  ? this.state.Temperature
                                  : ""
                              }
                            />
                          </Col>
                        </InputGroup>
                      </Row>
                      <Row>
                        {/* ///drop down Category// */}

                        <InputGroup className="mb-3">
                          <Col>
                            <b>Temperature Unit </b>
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

                      <Button block color="success">
                        Update Product
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
                <i className="fa fa-align-justify"></i> Product
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.ShelfData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.ShelfData}
                    defaultPageSize={10}
                    noDataText={"No Product Data Available"}
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
  CategoryData: state.AppSetting.CategoryData,
  ProductData: state.AppSetting.ProductData,
  ShelfData: state.AppSetting.ShelfData
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_SHELF_DATA: (newShelf) => dispach(updateShelf(newShelf)),
    DELETE_SHELF: (id) => dispach(deleteShelf(id)),
    GET_SHELF_DATA: () => dispach(getShelfData())

    //CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ShelfLivesData);
