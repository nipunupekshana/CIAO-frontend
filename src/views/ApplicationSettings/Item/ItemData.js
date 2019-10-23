/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateItem,
  deleteItem,
  getItemData
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

class ItemData extends Component {
  state = {
    modal: false,
    rawid: null,
    ProductisOpen: false,
    DuarationisOpen: false,
    ShelfisOpen: false,
    DeliveryIsOpen: false,

    DelId: null,
    shelfId: null,
    ProId: null,

    originalData: null,
    Name: "",
    Description: "",
    Price: null,
    Duaration: null,

    DuarationdropDownValue: "Please Select!",
    ShelfdropDownValue: "Please Select!",
    DeliverydropDownValue: "Please Select!",
    ProductdropDownValue: "Please Select!",

    visibilityUpdate: false,
    visibilityDelete: false,
    msg: null
  };
  componentDidMount() {
    this.props.GET_ITEM_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, ItemUpdateStatus } = this.props;

    if (
      ItemUpdateStatus !== prevProps.ItemUpdateStatus &&
      ItemUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_ITEM_UNSUCCESS") {
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

  Producttoggle() {
    this.setState({ ProductisOpen: !this.state.ProductisOpen });
  }
  Durationtoggle() {
    this.setState({ DuarationisOpen: !this.state.DuarationisOpen });
  }
  Shelftoggle() {
    this.setState({ ShelfisOpen: !this.state.ShelfisOpen });
  }
  Deliverytoggle() {
    this.setState({ DeliveryIsOpen: !this.state.DeliveryIsOpen });
  }

  deleteRaw(id) {
    console.log("Index: ", id);
    let productid = id.productId;
    let itemId = id.id;
    const delData = {
      productid,
      itemId
    };
    this.props.DELETE_ITEM(delData);
  }

  updateRaw = (id) => {
    console.log(id);

    if (id) {
      this.setState({
        originalData: id,
        id: id.id,
        DuarationdropDownValue: id.durationUnit,
        ShelfdropDownValue: id.shelfName,
        DeliverydropDownValue: id.deliveryName,
        ProductdropDownValue: id.productName,
        Name: id.name,
        Description: id.description,

        DelId: id.deliveryId,
        shelfId: id.shelfId,
        ProId: id.productId,
        Price: id.price,
        Duaration: id.duration
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

    const {
      id,
      Name,
      Description,
      DuarationdropDownValue,
      DelId,
      shelfId,
      ProId,
      Price,
      Duaration,
      originalData
    } = this.state;

    if (
      !ProId ||
      !Name ||
      !Price ||
      !Duaration ||
      DuarationdropDownValue === "Please Select!" ||
      !shelfId ||
      !DelId
    ) {
      this.setState({ msg: "Please Fil All Data!" });
    } else {
      this.setState({ msg: null });
      const ItemUpdate = {
        id,
        Name,
        Description,
        DuarationdropDownValue,
        DelId,
        shelfId,
        ProId,
        Price,
        Duaration,
        originalData
      };
      this.props.UPDATE_ITEM_DATA(ItemUpdate);
    }
  };

  render() {
    const coulmns = [
      {
        Header: "Item Name",
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "Product Name",
        accessor: "productName",
        sortable: true,
        filterable: true
      },
      {
        Header: "Price",
        accessor: "price",
        sortable: true,
        filterable: true
      },
      {
        Header: "Duaration ",
        accessor: "duration",
        sortable: true,
        filterable: true
      },
      {
        Header: "Duaration Unit ",
        accessor: "durationUnit",
        sortable: true,
        filterable: true
      },
      {
        Header: "shelf Life ",
        accessor: "shelfName",
        sortable: true,
        filterable: true
      },
      {
        Header: "Delivery Type ",
        accessor: "deliveryName",
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
                  this.deleteRaw(props.original);
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
              Update Item Data
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
                            <b>Product : </b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.ProductisOpen}
                              toggle={() => {
                                this.Producttoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.ProductdropDownValue}
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
                                {this.props.ProductData
                                  ? this.props.ProductData.map((pro, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="ProId"
                                          id={pro.id}
                                          onClick={(e) =>
                                            this.changeValue(e, pro.name)
                                          }
                                        >
                                          {pro.name}
                                        </DropdownItem>
                                      </div>
                                    ))
                                  : ""}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

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
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Description :</b>
                          </Col>
                          <Col>
                            <Input
                              type="textarea"
                              placeholder="Description"
                              value={this.state.Description}
                              name="Description"
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Price:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="Price"
                              name="Price"
                              value={this.state.Price}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Duration:</b>
                          </Col>
                          <Col>
                            <Input
                              type="number"
                              placeholder="Duration"
                              name="Duaration"
                              value={this.state.Duaration}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      {/* ///drop down duration unit// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Duaration Unit</b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.DuarationisOpen}
                              toggle={() => {
                                this.Durationtoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.DuarationdropDownValue}
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
                                      DuarationdropDownValue: "Day"
                                    })
                                  }
                                >
                                  Day
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      DuarationdropDownValue: "Week"
                                    })
                                  }
                                >
                                  Week
                                </DropdownItem>

                                <DropdownItem
                                  onClick={(e) =>
                                    this.setState({
                                      DuarationdropDownValue: "Month"
                                    })
                                  }
                                >
                                  Month
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      {/* ///drop down Shelf life// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Shelf Life</b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.ShelfisOpen}
                              toggle={() => {
                                this.Shelftoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.ShelfdropDownValue}
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
                                {this.props.ShelfData
                                  ? this.props.ShelfData.map((shelf, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="shelfId"
                                          id={shelf.id}
                                          onClick={(e) =>
                                            this.changeValue(e, shelf.name)
                                          }
                                        >
                                          {shelf.name}
                                        </DropdownItem>
                                      </div>
                                    ))
                                  : ""}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      {/* ///drop down Delivery// */}
                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Delivery Type</b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.DeliveryIsOpen}
                              toggle={() => {
                                this.Deliverytoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.DeliverydropDownValue}
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
                                {this.props.DeliveryData
                                  ? this.props.DeliveryData.map((Del, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="DelId"
                                          id={Del.id}
                                          onClick={(e) =>
                                            this.changeValue(e, Del.name)
                                          }
                                        >
                                          {Del.name}
                                        </DropdownItem>
                                      </div>
                                    ))
                                  : ""}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
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
                <i className="fa fa-align-justify"></i> Item
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.ItemData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.ItemData}
                    defaultPageSize={10}
                    noDataText={"No Item Data Available"}
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
  ItemData: state.AppSetting.ItemData,
  ShelfData: state.AppSetting.ShelfData,
  ProductData: state.AppSetting.ProductData,
  DeliveryData: state.AppSetting.DeliveryData,
  ItemUpdateStatus: state.AppSetting.ItemUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_ITEM_DATA: (ItemUpdate) => dispach(updateItem(ItemUpdate)),
    DELETE_ITEM: (id) => dispach(deleteItem(id)),
    GET_ITEM_DATA: () => dispach(getItemData()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ItemData);
