/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  getCategoryData,
  updateCategory,
  deleteCategory
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
  Input
} from "reactstrap";

import milk from "./../../../assets/Category data/milk.jpg";

class CategoryData extends Component {
  state = {
    modal: false,
    rawid: null,

    id: null,
    name: null,
    Description: null,

    userGroupId: null,

    visibilityUpdate: false,
    visibilityDelete: false
  };
  componentDidMount() {
    this.props.GET_CATEGORY_DATA();
  }

  modeltoggle = () => {
    //this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_CATEGORY(id);
  }

  updateRaw = (id) => {
    console.log(id);
    if (id) {
      this.setState({ id: id.id, name: id.name, Description: id.description });
    }

    this.modeltoggle();
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.modeltoggle();
    const { name, id, Description } = this.state;

    const newCategory = {
      id,
      name,
      Description
    };
    this.props.UPDATE_CATEGORY_DATA(newCategory);
  };

  render() {
    const coulmns = [
      {
        Header: "Category Name",
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "Category Description",
        Cell: (props) => {
          return (
            <div>
              <Input
                type="textarea"
                disabled={true}
                name="Description"
                value={props.original.description}
              />
            </div>
          );
        },
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
              Update Category Data
            </ModalHeader>
            <ModalBody>
              <Container>
                <Card className="mx-1 ">
                  <CardBody className="p-4  ">
                    <Form onSubmit={this.onSubmit}>
                      <div className="form-group row">
                        <label
                          htmlFor="Category ID"
                          className="col-sm-3 col-form-label"
                        >
                          Category ID
                        </label>
                        <div className="col-sm-10">
                          <Input
                            type="number"
                            name="id"
                            className="form-control  "
                            id="id"
                            value={this.state.id ? this.state.id : ""}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="Category Name"
                          className="col-sm-3 col-form-label"
                        >
                          Category Name:
                        </label>
                        <div className="col-sm-10">
                          <Input
                            type="text"
                            name="name"
                            className="form-control "
                            id="CategoryName"
                            onChange={this.onChange}
                            value={this.state.name ? this.state.name : ""}
                          />
                        </div>
                        <label
                          htmlFor="Category Description"
                          className="col-sm-3 col-form-label"
                        >
                          Category Description:
                        </label>
                        <div className="col-sm-10">
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
                        </div>
                      </div>

                      <Button block color="success">
                        Update Category
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
                <i className="fa fa-align-justify"></i> Category
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.CategoryData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.CategoryData}
                    defaultPageSize={10}
                    noDataText={"No Category Data Available"}
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
  CategoryData: state.AppSetting.CategoryData
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_CATEGORY_DATA: (newCategory) => dispach(updateCategory(newCategory)),
    DELETE_CATEGORY: (id) => dispach(deleteCategory(id)),
    GET_CATEGORY_DATA: () => dispach(getCategoryData())
    //CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CategoryData);
