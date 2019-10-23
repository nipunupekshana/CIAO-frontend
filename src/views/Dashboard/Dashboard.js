import React, { Component } from "react";

import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log("im calling props: " + JSON.stringify(this.props));
    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3"></Col>

          <Col xs="12" sm="6" lg="3"></Col>

          <Col xs="12" sm="6" lg="3"></Col>

          <Col xs="12" sm="6" lg="3"></Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>Traffic {" & "} Sales</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <p>Tesnew</p>
                    {this.props.title}
                  </Col>
                </Row>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
