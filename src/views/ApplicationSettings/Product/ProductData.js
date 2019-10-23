/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  getCategoryData,
  updateProduct,
  deleteProduct,
  getProductData
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

class ProductData extends Component {
  state = {
    modal: false,
    rawid: null,
    CategoryisOpen: false,

    CatId: null,
    id: null,
    name: null,
    Description: null,

    CategorydropDownValue: "Please Select!",

    visibilityUpdate: false,
    visibilityDelete: false
  };
  componentDidMount() {
    this.props.GET_CATEGORY_DATA();
    this.props.GET_PRODUCT_DATA();
  }

  modeltoggle = () => {
    //this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  Categorytoggle() {
    this.setState({ CategoryisOpen: !this.state.CategoryisOpen });
  }

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_PRODUCT(id);
  }

  updateRaw = (id) => {
    console.log(id);
    if (id) {
      this.setState({
        id: id.id,
        name: id.name,
        Description: id.description,
        CategorydropDownValue: id.categoryName
      });
    }

    this.modeltoggle();
  };

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
    this.modeltoggle();
    const { name, id, Description, CatId } = this.state;

    const newProduct = {
      id,
      name,
      Description,
      CatId
    };
    this.props.UPDATE_PRODUCT_DATA(newProduct);
  };

  render() {
    const coulmns = [
      {
        Header: "Product Name",
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "Product Description",
        accessor: "description",
        sortable: false,
        filterable: false
      },
      {
        Header: "Category Name",
        accessor: "categoryName",
        sortable: true,
        filterable: true
      },
      {
        Header: "Lower Price",
        accessor: "lowerPrice",
        sortable: true,
        filterable: true
      },
      {
        Header: "Upper Price",
        accessor: "upperPrice",
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
              Update Product Data
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
                            <b className="mr-2">Product ID</b>
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
                            <b className="mr-4">Product Name:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              name="name"
                              className="form-control "
                              id="CategoryName"
                              onChange={this.onChange}
                              value={this.state.name ? this.state.name : ""}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b className="mr-4">Product Description:</b>
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
                        {/* ///drop down Category// */}

                        <InputGroup className="mb-3">
                          <Col>
                            <b>Category Name</b>
                          </Col>

                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.CategoryisOpen}
                              toggle={() => {
                                this.Categorytoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
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
                {this.props.ProductData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.ProductData}
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
  ProductData: state.AppSetting.ProductData
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_PRODUCT_DATA: (newProduct) => dispach(updateProduct(newProduct)),
    DELETE_PRODUCT: (id) => dispach(deleteProduct(id)),
    GET_PRODUCT_DATA: () => dispach(getProductData()),
    GET_CATEGORY_DATA: () => dispach(getCategoryData())
    //CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ProductData);
