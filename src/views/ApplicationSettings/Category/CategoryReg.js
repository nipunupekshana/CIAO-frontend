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
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { AddCategory } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "./../../../actions/errorActions";
import CategoryData from "./CategoryData";

class CategoryReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modal: false,
      Name: "",
      Description: "",

      msg: null,
      visibilityReg: true
    };
  }

  componentDidUpdate(prevProps) {
    const { error, CategoryAddStatus } = this.props;

    if (CategoryAddStatus !== prevProps.CategoryAddStatus) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_CATEGORY_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { Name, Description } = this.state;
    const newCategory = {
      Name,
      Description
    };
    this.props.ADD_CATEGORY(newCategory);
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Add Category Data</ModalHeader>

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
                          placeholder="Category Name"
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
                          placeholder="Category Description"
                          name="Description"
                          autoComplete="Description"
                          onChange={this.onChange}
                        />
                      </InputGroup>

                      <Button color="success" block>
                        Create Category
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
                Add New Category
              </Button>
            ) : null}
          </Row>

          <CategoryData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  CategoryAddStatus: state.AppSetting.CategoryAddStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_CATEGORY: (newCategory) => dispach(AddCategory(newCategory)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CategoryReg);
