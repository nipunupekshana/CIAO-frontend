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
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { register, loadPermission } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import Users from "../Users/Users";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      dropDownValue: " Please Select",
      modal: false,
      Name: "",
      Username: "",
      Email: "",
      Password: "",
      Mobile: "",
      UserTypeID: "",
      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {
    const { permissions } = this.props;

    if (permissions) {
      if (permissions.name === "admin") {
        if (permissions.create === 1) {
          this.setState({ visibilityReg: true });
        } else {
          this.setState({ visibilityReg: false });
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenicated, RegStatus } = this.props;
    
    if (RegStatus !== prevProps.RegStatus && RegStatus === true) {
      

      this.modeltoggle();
      this.setState({
        dropDownValue: " Please Select",
        Name: "",
        Username: "",
        Email: "",
        Password: "",
        Mobile: "",
        UserTypeID: ""
      });
    }
    
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    console.log("is auth = " + isAuthenicated);
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeValue(e) {
    console.log(e.target.name);
    this.setState({ dropDownValue: e.target.name, UserTypeID: e.target.name });
  }

  onSubmit = e => {
    e.preventDefault();
    const { Name, Email, Password, UserTypeID, Mobile, Username } = this.state;

    const newUser = {
      Name,
      Username,
      Email,
      Password,
      Mobile,
      UserTypeID
    };
    this.props.REGISTER(newUser);
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Register User</ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col md="9" lg="8" xl="12">
                <Card className="mx-1">
                  <CardBody className="p-4">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      <p className="text-muted">Create your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Name"
                          name="Name"
                          autoComplete="Name"
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
                          type="text"
                          name="Username"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="Email"
                          placeholder="Email"
                          autoComplete="email"
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="Password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          onChange={this.onChange}
                        />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa-mobile-phone"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="Mobile"
                          placeholder="Mobile No"
                          autoComplete="Mobile"
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText className="mr-2">
                          User type
                        </InputGroupText>
                        <ButtonDropdown
                          isOpen={this.state.isOpen}
                          toggle={() => {
                            this.toggle();
                          }}
                        >
                          <DropdownToggle caret color="light">
                            {this.state.dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              name="User"
                              onClick={e => this.changeValue(e)}
                            >
                              User
                            </DropdownItem>

                            <DropdownItem
                              name="Admin"
                              onClick={e => this.changeValue(e)}
                            >
                              Admin
                            </DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </InputGroup>

                      <Button color="success" block>
                        Create Account
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
                Register New User
              </Button>
            ) : null}
          </Row>

          <Users />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenicated: state.auth.isAuthenicated,
  RegStatus: state.auth.RegStatus,
  permissions: state.auth.permission,
  error: state.error
});

const mapDispachToProps = dispach => {
  return {
    REGISTER: newUser => dispach(register(newUser)),
    LOAD_PERMISSION: () => dispach(loadPermission()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Register);
