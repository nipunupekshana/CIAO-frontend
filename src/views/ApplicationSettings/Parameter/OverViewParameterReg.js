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
import { AddParameter } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import OverViewParameterData from "./OverViewParameterData";

class OverViewParameterReg extends Component {
  constructor() {
    super();

    this.state = {
      DataTypeisOpen: false,
      IsTrue: false,

      isOpen: false,
      modal: false,

      Name: "",
      Description: "",
      Data: "",

      DataTypedropDownValue: "Please Select!",

      checked: false,

      msg: null,
      visibilityReg: true
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error, paramStatus } = this.props;

    if (paramStatus !== prevProps.paramStatus && paramStatus === true) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_PARAMETER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      DataTypedropDownValue: "Please Select!",
      Name: "",
      Description: "",
      Data: ""
    });
    this.setState({ modal: !this.state.modal });
  };

  DataTypetoggle() {
    this.setState({ DataTypeisOpen: !this.state.DataTypeisOpen, Data: "" });
  }

  handleDate(e) {
    this.setState({ Data: e.target.value });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let value;
    const { Name, Description, Data, DataTypedropDownValue } = this.state;
    value = Data;

    if (!Name || DataTypedropDownValue === "Please Select!") {
      this.setState({ msg: "Please Fil All Data!" });
    } else {
      if (DataTypedropDownValue === "LOGICAL") {
        if (this.state.IsTrue) {
          value = "True";
        } else {
          value = "False";
        }
      }
      this.setState({ msg: null });
      const newParameter = {
        Name,
        Description,
        value,
        DataTypedropDownValue
      };
      console.log(Name, Description, DataTypedropDownValue, value);
      this.props.ADD_PARAMETER(newParameter);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>
            Add OverView Parameters{" "}
          </ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col>
                <Card className="mx-1">
                  <CardBody className="p-4">
                    {this.state.msg ? (
                      <Alert color="danger">{this.state.msg}</Alert>
                    ) : null}
                    <Form onSubmit={this.onSubmit}>
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

                        <InputGroup className="mb-3">
                          <Col>
                            <b>Description:</b>
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

                        <InputGroup className="mb-3">
                          <Col>
                            <b>Data Type : </b>
                          </Col>
                          <Col>
                            <ButtonDropdown
                              isOpen={this.state.DataTypeisOpen}
                              toggle={() => {
                                this.DataTypetoggle();
                              }}
                            >
                              <DropdownToggle caret color="light">
                                {this.state.DataTypedropDownValue}
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
                                  name="INT"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "INT",
                                      type: "number"
                                    })
                                  }
                                >
                                  INT
                                </DropdownItem>
                                <DropdownItem
                                  name="STRING"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "STRING",
                                      type: "text"
                                    })
                                  }
                                >
                                  STRING
                                </DropdownItem>
                                <DropdownItem
                                  name="DECIMAL"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "DECIMAL",
                                      type: "number",
                                      min: 0
                                    })
                                  }
                                >
                                  DECIMAL
                                </DropdownItem>
                                <DropdownItem
                                  name="LOGICAL"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "LOGICAL",
                                      type: "checkbox"
                                    })
                                  }
                                >
                                  LOGICAL
                                </DropdownItem>
                                <DropdownItem
                                  name="DATE"
                                  onClick={(e) =>
                                    this.setState({
                                      DataTypedropDownValue: "DATE"
                                    })
                                  }
                                >
                                  DATE
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row className="mb-3">
                        <Col
                          className="animated fadeIn "
                          hidden={
                            this.state.DataTypedropDownValue ===
                            "Please Select!"
                              ? true
                              : false
                          }
                        >
                          <b>Data:</b>
                        </Col>
                        <Col>
                          {this.state.DataTypedropDownValue === "INT" ? (
                            <Input
                              type="number"
                              name="Data"
                              placeholder="INT"
                              value={this.state.Data}
                              onChange={(e) =>
                                this.setState({ Data: e.target.value })
                              }
                            ></Input>
                          ) : this.state.DataTypedropDownValue === "STRING" ? (
                            <Input
                              type="text"
                              name="Data"
                              value={this.state.Data}
                              placeholder="STRING"
                              onChange={(e) =>
                                this.setState({ Data: e.target.value })
                              }
                            ></Input>
                          ) : this.state.DataTypedropDownValue === "DECIMAL" ? (
                            <Input
                              type="number"
                              name="Data"
                              min="0"
                              value={this.state.Data}
                              placeholder="DECIMAL"
                              onChange={(e) =>
                                this.setState({ Data: e.target.value })
                              }
                            ></Input>
                          ) : this.state.DataTypedropDownValue === "LOGICAL" ? (
                            <Input
                              className="ml-1"
                              type="checkbox"
                              id="bool"
                              checked={this.state.IsTrue}
                              onChange={() => {
                                this.setState({
                                  IsTrue: !this.state.IsTrue
                                });
                              }}
                            />
                          ) : this.state.DataTypedropDownValue === "DATE" ? (
                            <Input
                              type="date"
                              onChange={(e) => this.handleDate(e)}
                            />
                          ) : null}
                        </Col>
                      </Row>

                      <Button color="success" block>
                        Create Parameter
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
                Add New Parameter
              </Button>
            ) : null}
          </Row>
          <OverViewParameterData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  paramStatus: state.AppSetting.paramStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_PARAMETER: (newParameter) => dispach(AddParameter(newParameter)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(OverViewParameterReg);
