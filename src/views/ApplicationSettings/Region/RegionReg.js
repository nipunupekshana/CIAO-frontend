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
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { AddRegion } from "../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";
import RegionData from "./RegionData";
class RegionReg extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      modal: false,

      Name: "",

      msg: null
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error, RegionStatus } = this.props;

    if (RegionStatus !== prevProps.RegionStatus && RegionStatus === true) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "ADD_REGION_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({
      Name: ""
    });
    this.setState({ modal: !this.state.modal });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { Name } = this.state;

    if (!Name) {
      this.setState({ msg: "Please Fill Region Name!" });
    } else {
      this.setState({ msg: null });
      const RegionData = {
        Name
      };
      console.log(Name);
      this.props.ADD_REGION(RegionData);
    }
  };

  render() {
    return (
      <div className="app flex-row  ">
        <Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
          <ModalHeader toggle={this.modeltoggle}>Define a Region</ModalHeader>

          <ModalBody>
            <Row className="justify-content-center">
              <Col md="9" lg="8" xl="12">
                <Card className="mx-1">
                  <CardBody className="p-3">
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
                      </Row>

                      <Button color="success" block>
                        Create
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        <Container>
          <Row className="d-flex justify-content-end">
            <Button
              onClick={this.modeltoggle}
              className="mb-2  mr-3 "
              outline
              color="success"
            >
              Define Region
            </Button>
          </Row>
          <RegionData />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  RegionStatus: state.AppSetting.RegionStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    ADD_REGION: (RegionType) => dispach(AddRegion(RegionType)),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(RegionReg);
