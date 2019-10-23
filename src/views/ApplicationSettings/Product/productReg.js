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
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { connect } from "react-redux";
import {
  AddProduct,
  getProductData,
  getCategoryData
} from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "./../../../actions/errorActions";
import ProductData from "./ProductData";
class productReg extends Component {
  constructor() {
    super();

    this.state = {
      CategoryisOpen: false,
      isOpen: false,
      modal: false,

      CatId: null,
      Name: "",
      Description: "",

      CategorydropDownValue: "Please Select!",

      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {
    this.props.GET_CATEGORY_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, ProductAddStatus } = this.props;

    if (ProductAddStatus !== prevProps.ProductAddStatus) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_PRODUCT_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      CategorydropDownValue: "Please Select!",
      Name: "",
      Description: "",
      CatId: null
    });
    this.setState({ modal: !this.state.modal });
  };

  Categorytoggle() {
    this.setState({ CategoryisOpen: !this.state.CategoryisOpen });
  }

  changeValue(e, name) {
    console.log(e.target.name);
    if (e.target.name === "CatId") {
      this.setState({
        [e.target.name]: e.target.id,
        CategorydropDownValue: name
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, Description, CatId } = this.state;
    const newProduct = {
      Name,
      Description,
      CatId
    };

    this.props.ADD_PRODUCT(newProduct);
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Add Product Data</ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col md="9" lg="8" xl="12">
                <Card className="mx-1">
                  <CardBody className="p-4">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Product Name"
                          name="Name"
                          onChange={this.onChange}
                        />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="textarea"
                          placeholder="Product Description"
                          name="Description"
                          autoComplete="Description"
                          onChange={this.onChange}
                        />
                      </InputGroup>

                      {/* ///drop down Category// */}
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <b>Category Name</b>
                        </InputGroupText>
                        <ButtonDropdown
                          isOpen={this.state.CategoryisOpen}
                          toggle={() => {
                            this.Categorytoggle();
                          }}
                        >
                          <DropdownToggle className="ml-4" caret color="light">
                            {this.state.CategorydropDownValue}
                          </DropdownToggle>
                          <DropdownMenu right>
                            {this.props.CategoryData
                              ? this.props.CategoryData.map((cat, i) => (
                                  <div key={i}>
                                    <DropdownItem
                                      name="CatId"
                                      id={cat.id}
                                      onClick={(e) =>
                                        this.changeValue(e, cat.name)
                                      }
                                    >
                                      {cat.name}
                                    </DropdownItem>
                                  </div>
                                ))
                              : ""}
                          </DropdownMenu>
                        </ButtonDropdown>
                      </InputGroup>

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
                Add New Product
              </Button>
            ) : null}
          </Row>

          <ProductData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ProductAddStatus: state.AppSetting.ProductAddStatus,
  CategoryData: state.AppSetting.CategoryData,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_PRODUCT: (newProduct) => dispach(AddProduct(newProduct)),
    GET_PRODUCT_DATA: () => dispach(getProductData()),
    GET_CATEGORY_DATA: () => dispach(getCategoryData()),
    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(productReg);
