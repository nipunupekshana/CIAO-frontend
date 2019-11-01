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
import { loadPermission, regUserGroup } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import UserGroup from "./UserGroup";

class UserGroupReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modal: false,
      Name: "",

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
    const { error, addUGrpStatus } = this.props;

    if (addUGrpStatus !== prevProps.addUGrpStatus) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "REGISTER_USER_GROUP_FAIL") {
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

    const { Name } = this.state;
    const newUserGroup = {
      Name
    };
    this.props.ADD_USER_GROUP(newUserGroup);
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Add User Group</ModalHeader>

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
                          placeholder="User Group Name"
                          name="Name"
                          autoComplete="Name"
                          onChange={this.onChange}
                        />
                      </InputGroup>

                      <Button color="success" block>
                        Create User Group
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
                Register New User Group
              </Button>
            ) : null}
          </Row>

          <UserGroup />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addUGrpStatus: state.auth.addUGrpStatus,
  permissions: state.auth.permission,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_USER_GROUP: (newUser) => dispach(regUserGroup(newUser)),
    LOAD_PERMISSION: () => dispach(loadPermission()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(UserGroupReg);
