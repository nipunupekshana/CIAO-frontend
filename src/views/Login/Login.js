import React, { Component } from "react";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
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
import "./login.css";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
// import { Translation, getI18n } from "react-i18next";
// import en from "../../assets/img/en.png";
// import fr from "../../assets/img/fr.png";
// import nl from "../../assets/img/nl.png";
class Login extends Component {
  state = {
    modal: false,
    UserName: "",
    Password: "",
    msg: null,
    isOpen: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  // changeValue(lang) {
  //   i18next.changeLanguage(lang);
  // }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { UserName, Password } = this.state;
    const newUser = {
      UserName,
      Password
    };
    this.props.LOGIN(newUser);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="app flex-row align-items-center login_back">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {/* // ##########testing##### */}
                    {/* <InputGroup className="mb-3">
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
                            onClick={(e) => this.changeValue(e)}
                          >
                            User
                          </DropdownItem>

                          <DropdownItem
                            name="Admin"
                            onClick={(e) => this.changeValue(e)}
                          >
                            Admin
                          </DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </InputGroup> */}

                    {/* // ##########test end########## */}
                    <Form onSubmit={this.onSubmit}>
                      <h1>login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {this.state.msg ? (
                        <Alert color="danger">{this.state.msg}</Alert>
                      ) : null}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="UserName"
                          placeholder="Username"
                          autoComplete="username"
                          onChange={this.onChange}
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
                          placeholder="Password"
                          autoComplete="current-password"
                          name="Password"
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenicated: state.auth.isAuthenicated,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    LOGIN: (newUser) => dispach(login(newUser)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Login);
