import React, { Component } from 'react';
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
} from 'reactstrap';
import { connect } from 'react-redux';
import { regProgram } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import Program from './Program';

class Program_Reg extends Component {
	constructor() {
		super();

		this.state = {
			isOpen: false,
			modal: false,
			Name: '',
			msg: null,
			visibilityReg: true
		};
	}

	componentDidUpdate(prevProps) {
		const { error, addProgramStatus } = this.props;

		if (addProgramStatus !== prevProps.addProgramStatus) {
			this.modeltoggle();
		}

		if (error !== prevProps.error) {
			if (error.id === 'REG_PROGRAM_FAIL') {
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
		const newProgram = {
			Name
		};
		this.props.REG_PROGRAM(newProgram);
	};

	render() {
		return (
			<div className="app flex-row  ">
				<Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
					<ModalHeader toggle={this.modeltoggle}>Add Program</ModalHeader>

					<ModalBody>
						<Row className="justify-content-center">
							<Col md="9" lg="8" xl="12">
								<Card className="mx-1">
									<CardBody className="p-4">
										{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
										<Form onSubmit={this.onSubmit}>
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="text"
													placeholder="Program Name"
													name="Name"
													autoComplete="Name"
													onChange={this.onChange}
												/>
											</InputGroup>

											<Button color="success" block>
												Create Program
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
							<Button onClick={this.modeltoggle} className="mb-2  mr-3 " outline color="success">
								Register New Program
							</Button>
						) : null}
					</Row>
					<Program />
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	addProgramStatus: state.auth.addProgramStatus,
	error: state.error
});

const mapDispachToProps = (dispach) => {
	return {
		REG_PROGRAM: (newProgram) => dispach(regProgram(newProgram)),

		CLEAR_ERROR: () => dispach(clearErrors())
	};
};

export default connect(mapStateToProps, mapDispachToProps)(Program_Reg);
