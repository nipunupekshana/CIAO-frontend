/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from "react-redux";
import {
  updateCountry,
  deleteCountry,
  getCountry
} from "./../../../actions/AuthApplicationSettingActions";
import { clearErrors } from "../../../actions/errorActions";

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
  Alert
} from "reactstrap";

class CountryData extends Component {
  state = {
    modal: false,

    id: null,
    Name: "",
    Abbreviation: "",

    msg: null
  };
  componentDidMount() {
    this.props.GET_COUNTRY_DATA();
  }

  componentDidUpdate(prevProps) {
    const { error, CountryUpdateStatus } = this.props;

    if (
      CountryUpdateStatus !== prevProps.CountryUpdateStatus &&
      CountryUpdateStatus === true
    ) {
      this.modeltoggle();
    }

    if (error !== prevProps.error) {
      if (error.id === "UPDATE_COUNTRY_UNSUCCESS") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  modeltoggle = () => {
    this.props.CLEAR_ERROR();
    this.setState({ msg: null });
    this.setState({ modal: !this.state.modal });
  };

  deleteRaw(id) {
    console.log("Index: ", id);

    this.props.DELETE_COUNTRY(id);
  }

  updateRaw = (id) => {
    console.log(id);

    if (id) {
      this.setState({
        id: id.id,
        Name: id.name,
        Abbreviation: id.abbreviation
      });
    }

    this.modeltoggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { id, Name, Abbreviation } = this.state;

    if (!Name || !Abbreviation) {
      this.setState({ msg: "Please Fill All Data!" });
    } else {
      this.setState({ msg: null });

      const newCountry = {
        id,
        Name,
        Abbreviation
      };
      console.log(id, Name, Abbreviation);

      this.props.UPDATE_COUNTRY(newCountry);
    }
  };

  render() {
    const coulmns = [
      {
        Header: " Name",
        accessor: "name",
        sortable: true,
        filterable: true
      },
      {
        Header: "Abbreviation",
        accessor: "abbreviation",
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
              Update Country Data
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
                            <b>Country Name:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Country Name"
                              name="Name"
                              value={this.state.Name}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Row>
                        <InputGroup className="mb-3">
                          <Col>
                            <b>Abbreviation:</b>
                          </Col>
                          <Col>
                            <Input
                              type="text"
                              placeholder="Abbreviation"
                              name="Abbreviation"
                              value={this.state.Abbreviation}
                              onChange={this.onChange}
                            />
                          </Col>
                        </InputGroup>
                      </Row>

                      <Button block color="success">
                        Update
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
                <i className="fa fa-align-justify"></i> Country
                <small className="text-muted"> Data</small>
              </CardHeader>
              <CardBody>
                {this.props.CountryData ? (
                  <ReactTable
                    columns={coulmns}
                    data={this.props.CountryData}
                    defaultPageSize={10}
                    noDataText={"No Country Data Available"}
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
  CountryData: state.AppSetting.CountryData,

  CountryUpdateStatus: state.AppSetting.CountryUpdateStatus,
  error: state.error
});

const mapDispachToProps = (dispach) => {
  return {
    UPDATE_COUNTRY: (Update) => dispach(updateCountry(Update)),
    DELETE_COUNTRY: (id) => dispach(deleteCountry(id)),
    GET_COUNTRY_DATA: () => dispach(getCountry()),

    CLEAR_ERROR: () => dispach(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(CountryData);
