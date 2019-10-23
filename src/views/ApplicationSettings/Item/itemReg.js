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
import {
  AddItem,
  getProductData,
  getCategoryData,
  getShelfData,
  getDeliveryData
} from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "./../../../actions/errorActions";
import ItemData from "./ItemData";
class itemReg extends Component {
  constructor() {
    super();

    this.state = {
      ProductisOpen: false,
      DuarationisOpen: false,
      ShelfisOpen: false,
      DeliveryIsOpen: false,
      isOpen: false,
      modal: false,

      DelId: null,
      shelfId: null,
      ProId: null,

      Name: "",
      Description: "",
      Price: null,
      Duaration: null,

      DuarationdropDownValue: "Please Select!",
      ShelfdropDownValue: "Please Select!",
      DeliverydropDownValue: "Please Select!",
      ProductdropDownValue: "Please Select!",

      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {
    this.props.GET_CATEGORY_DATA();
    this.props.GET_DELIVERY_DATA();
    this.props.GET_SHELF_DATA();
    this.props.GET_PRODUCT_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, ItemStatus } = this.props;

    if (ItemStatus !== prevProps.ItemStatus && ItemStatus === true) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_ITEM_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      DuarationdropDownValue: "Please Select!",
      ShelfdropDownValue: "Please Select!",
      DeliverydropDownValue: "Please Select!",
      ProductdropDownValue: "Please Select!",
      Name: "",
      Description: "",
      CatId: null,
      DelId: null,
      shelfId: null,
      ProId: null,
      Price: null,
      Duaration: null
    });
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
      Name,
      Description,
      DuarationdropDownValue,
      DelId,
      shelfId,
      ProId,
      Price,
      Duaration
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
      const newITEM = {
        Name,
        Description,
        DelId,
        shelfId,
        ProId,
        Price,
        Duaration,
        DuarationdropDownValue
      };

      this.props.ADD_ITEM(newITEM);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Add Item Data</ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col md="9" lg="8" xl="12">
                <Card className="mx-1">
                  <CardBody className="p-4">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      {/* ///drop down Category// */}
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

                      <Button color="success" block>
                        Create Product
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
            {this.state.visibilityReg ? (
              <Button
                onClick={this.modeltoggle}
                className="mb-2  mr-3 "
                outline
                color="success"
              >
                Add New item
              </Button>
            ) : null}
          </Row>
          <ItemData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ItemStatus: state.AppSetting.ItemStatus,
  ShelfData: state.AppSetting.ShelfData,
  ProductData: state.AppSetting.ProductData,
  CategoryData: state.AppSetting.CategoryData,
  DeliveryData: state.AppSetting.DeliveryData,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_ITEM: (newITEM) => dispach(AddItem(newITEM)),
    GET_DELIVERY_DATA: () => dispach(getDeliveryData()),
    GET_SHELF_DATA: () => dispach(getShelfData()),
    GET_PRODUCT_DATA: () => dispach(getProductData()),
    GET_CATEGORY_DATA: () => dispach(getCategoryData()),
    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(itemReg);
