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
  InputGroup,
  Row,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
  Alert,
  Dropdown
} from "reactstrap";
import { connect } from "react-redux";
import {
  loadPermission,
  regUserPermission
} from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";
import { showusers, getProgram } from "../../../actions/tableActions";
import Switch from "react-toggle-switch";
import "../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import UserPermission from "./UserPermission";

class UserPermissionReg extends Component {
  constructor() {
    super();

    this.state = {
      UserisOpen: false,
      ProgramisOpen: false,


      UserDropDownValue: "Please Select",
      ProgramDropDownValue: "Please Select",


      CreateSwitched: false,
      ReadSwitched: false,
      UpdateSwitched: false,
      DeleteSwitched: false,
      modal: false,

      UserId: null,
      ProgramId: null,

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
    this.props.SHOW_USERS();
    this.props.GET_PROGRAM();
  }

  componentDidUpdate(prevProps) {
    const { error, RegUPermissionStatus } = this.props;
    if (RegUPermissionStatus !== prevProps.RegUPermissionStatus && RegUPermissionStatus ===  true ) {

      this.modeltoggle();
      this.setState({
        msg: null,
        UserId: null,
        ProgramId: null,
        CreateSwitched: false,
        ReadSwitched: false,
        UserDropDownValue: "Please Select",
        ProgramDropDownValue: "Please Select",
        UpdateSwitched: false,
        DeleteSwitched: false
      });
    }
    if (error !== prevProps.error) {
      if (error.id === "REG_USER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggleSwitch = switchName => {
    console.log(switchName);
    if (switchName === "Create") {
      this.setState({ CreateSwitched: !this.state.CreateSwitched });
    } else if (switchName === "Read") {
      this.setState({ ReadSwitched: !this.state.ReadSwitched });
    } else if (switchName === "Update") {
      this.setState({ UpdateSwitched: !this.state.UpdateSwitched });
    } else if (switchName === "Delete") {
      this.setState({ DeleteSwitched: !this.state.DeleteSwitched });
    }
  };

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({ modal: !this.state.modal });
  };

  Usertoggle() {
    this.setState({ UserisOpen: !this.state.UserisOpen });
  }
  Programtoggle() {
    this.setState({ ProgramisOpen: !this.state.ProgramisOpen });
  }

  changeValue(e, name) {
    console.log(e.target.name);
    if (e.target.name === "UserId") {
      this.setState({ UserDropDownValue: name, UserId: parseInt(e.target.id) });
    } else if (e.target.name === "ProgramId") {
      this.setState({
        ProgramDropDownValue: name,
        ProgramId: parseInt(e.target.id)
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    let CreateSwitchedData = 0;
    let ReadSwitchedData = 0;
    let UpdateSwitchedData = 0;
    let DeleteSwitchedData = 0;
    const {
      UserId,
      ProgramId,
      UserDropDownValue,
      ProgramDropDownValue,
      CreateSwitched,
      ReadSwitched,
      UpdateSwitched,
      DeleteSwitched
    } = this.state;

    if ((UserDropDownValue || ProgramDropDownValue) === "Please Select" ||(UserId == null || ProgramId == null)  ) {
      this.setState({ msg: "Please Select User & Program!" });
    } else {
      if (CreateSwitched) {
        CreateSwitchedData = 1;
      }
      if (ReadSwitched) {
        ReadSwitchedData = 1;
      }
      if (UpdateSwitched) {
        UpdateSwitchedData = 1;
      }
      if (DeleteSwitched) {
        DeleteSwitchedData = 1;
      }

      const newUserPermission = {
        UserId,
        ProgramId,
        CreateSwitchedData,
        ReadSwitchedData,
        UpdateSwitchedData,
        DeleteSwitchedData
      };

      this.props.REG_USER_PERMISSION(newUserPermission);

      
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            User Permission Mapping
          </ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col md="9" lg="8" xl="12">
                <Card className="mx-1">
                  <CardBody className="p-4">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
                      <p className="text-muted">Map User Permissions</p>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col xs="4 mr-5">User :</Col>
                          <Col xs="4">
                            <Dropdown
                              isOpen={this.state.UserisOpen}
                              toggle={() => this.Usertoggle()}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.UserDropDownValue}
                              </DropdownToggle>
                              <DropdownMenu
                                modifiers={{
                                  setMaxHeight: {
                                    enabled: true,
                                    order: 890,
                                    fn: data => {
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
                                {this.props.users
                                  ? this.props.users.map((users, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="UserId"
                                          id={users.id}
                                          onClick={e =>
                                            this.changeValue(e, users.name)
                                          }
                                        >
                                          {users.name}
                                        </DropdownItem>
                                      </div>
                                    ))
                                  : ""}
                              </DropdownMenu>
                            </Dropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col xs="4 mr-5">Program :</Col>
                          <Col xs="4">
                            <ButtonDropdown
                              isOpen={this.state.ProgramisOpen}
                              toggle={() => {
                                this.Programtoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.ProgramDropDownValue}
                              </DropdownToggle>
                              <DropdownMenu right>
                                {this.props.Program
                                  ? this.props.Program.map((Program, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="ProgramId"
                                          id={Program.id}
                                          onClick={e =>
                                            this.changeValue(e, Program.name)
                                          }
                                        >
                                          {Program.name}
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
                          <Col xs="4 mr-5 ">Create :</Col>
                          <Col xs="4">
                            <Switch
                              onClick={() => this.toggleSwitch("Create")}
                              on={this.state.CreateSwitched}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col xs="4 mr-5">Read :</Col>
                          <Col xs="4">
                            <Switch
                              onClick={() => this.toggleSwitch("Read")}
                              on={this.state.ReadSwitched}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col xs="4 mr-5">Update :</Col>
                          <Col xs="4">
                            <Switch
                              onClick={() => this.toggleSwitch("Update")}
                              on={this.state.UpdateSwitched}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col xs="4 mr-5">Delete :</Col>
                          <Col xs="4">
                            <Switch
                              onClick={() => this.toggleSwitch("Delete")}
                              on={this.state.DeleteSwitched}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

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

          <UserPermission />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  RegUPermissionStatus:state.auth.RegUPermissionStatus,
  users: state.table.users,
  Program: state.table.Program,
  error: state.error
});

const mapDispachToProps = dispach => {
  return {
    LOAD_PERMISSION: () => dispach(loadPermission()),
    GET_PROGRAM: () => dispach(getProgram()),
    SHOW_USERS: () => dispach(showusers()),
    CLEAR_ERROR: () => dispach(clearErrors()),
    REG_USER_PERMISSION: UserPermissionData =>
      dispach(regUserPermission(UserPermissionData))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(UserPermissionReg);
