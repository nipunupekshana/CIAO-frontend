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
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import { loadPermission, regRoleMapping } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";
import { getUserRoles, getProgram } from "../../../actions/tableActions";
import Switch from "react-toggle-switch";
import "../../../../node_modules/react-toggle-switch/dist/css/switch.min.css";
import RolePermission from "./RolePermission";

class RolePermissionReg extends Component {
  constructor() {
    super();

    this.state = {
      RoleisOpen: false,
      ProgramisOpen: false,
      RoleDropDownValue: "Please Select",
      ProgramDropDownValue: "Please Select",
      CreateSwitched: false,
      ReadSwitched: false,
      UpdateSwitched: false,
      DeleteSwitched: false,

      modal: false,
      SubModal: false,
      closeAll: false,
      Prompt: null,

      roleId: null,
      ProgramId: null,

      newRoleMapped:null,

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
    this.props.GET_USER_ROLES();
    this.props.GET_PROGRAM();
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenicated } = this.props;
    
    if (error !== prevProps.error) {
      if (error.id === "ROLE_MAPIING_FAIL") {
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

  toggleNested() {
    this.setState({
      SubModal: !this.state.SubModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      SubModal: !this.state.SubModal,
      modal: !this.state.modal,
      closeAll: true
    });
  }

  Roletoggle() {
    this.setState({ RoleisOpen: !this.state.RoleisOpen });
  }
  Programtoggle() {
    this.setState({ ProgramisOpen: !this.state.ProgramisOpen });
  }

  changeValue(e, name) {
    console.log(e.target.name);
    if (e.target.name === "roleId") {
      this.setState({ RoleDropDownValue: name, roleId: parseInt(e.target.id) });
    } else if (e.target.name === "ProgramId") {
      this.setState({
        ProgramDropDownValue: name,
        ProgramId: parseInt(e.target.id)
      });
    }
  }

  UpdateData() {
    const{newRoleMapped} =this.state;
    
    if (this.state.Prompt === true) {
      console.log("propms true");
      
      this.props.REG_ROLE_MAPPING(newRoleMapped, this.state.Prompt);
      
    } else if (this.state.Prompt === false) {

      console.log("propms falles");

      this.props.REG_ROLE_MAPPING(newRoleMapped, this.state.Prompt);
    } else {
      console.log("propms null");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    let CreateSwitchedData = 0;
    let ReadSwitchedData = 0;
    let UpdateSwitchedData = 0;
    let DeleteSwitchedData = 0;
    const {
      roleId,
      ProgramId,
      RoleDropDownValue,
      ProgramDropDownValue,
      CreateSwitched,
      ReadSwitched,
      UpdateSwitched,
      DeleteSwitched,
      
    } = this.state;

    if ((RoleDropDownValue && ProgramDropDownValue) === "Please Select") {
      this.setState({ msg: "Please Select Role & Program!" });
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

      const newRoleMap = {
        roleId,
        ProgramId,
        CreateSwitchedData,
        ReadSwitchedData,
        UpdateSwitchedData,
        DeleteSwitchedData
      };
      this.setState({newRoleMapped:newRoleMap})
      this.toggleNested();
      

      this.setState({
        msg: null,
        roleId: null,
        ProgramId: null,
        CreateSwitched: false,
        ReadSwitched: false,
        RoleDropDownValue: "Please Select",
        ProgramDropDownValue: "Please Select",
        UpdateSwitched: false,
        DeleteSwitched: false,
        Prompt: null
      });
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            Role Permission Mapping
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
                      <p className="text-muted">Map Roles And Permissions</p>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col xs="4 mr-5">User Roles :</Col>
                          <Col xs="4">
                            <ButtonDropdown
                              isOpen={this.state.RoleisOpen}
                              toggle={() => {
                                this.Roletoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.RoleDropDownValue}
                              </DropdownToggle>
                              <DropdownMenu right>
                                {this.props.roles
                                  ? this.props.roles.map((roles, i) => (
                                      <div key={i}>
                                        <DropdownItem
                                          name="roleId"
                                          id={roles.id}
                                          onClick={e =>
                                            this.changeValue(e, roles.name)
                                          }
                                        >
                                          {roles.name}
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
                        Create Role Permission
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Modal
              isOpen={this.state.SubModal}
              toggle={this.toggleNested}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>Attention!</ModalHeader>
              <ModalBody>
                Do you need to copy this permission to other users also?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    this.toggleAll();
                    this.setState({ Prompt: true }, () => {
                      this.UpdateData();
                    });
                  }}
                >
                  Yes
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    this.toggleAll();
                    this.setState({ Prompt: false }, () => {
                      this.UpdateData();
                    });
                  }}
                >
                  No
                </Button>
              </ModalFooter>
            </Modal>
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
                Register New Role Permission
              </Button>
            ) : null}
          </Row>

          <RolePermission />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  permissions: state.auth.permission,
  roles: state.table.roles,
  Program: state.table.Program,
  error: state.error
});

const mapDispachToProps = dispach => {
  return {
    LOAD_PERMISSION: () => dispach(loadPermission()),
    GET_PROGRAM: () => dispach(getProgram()),
    GET_USER_ROLES: () => dispach(getUserRoles()),
    CLEAR_ERROR: () => dispach(clearErrors()),
    REG_ROLE_MAPPING: (rollMapedData, Prompt) =>
      dispach(regRoleMapping(rollMapedData, Prompt))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(RolePermissionReg);
