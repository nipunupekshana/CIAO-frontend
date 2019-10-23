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
	Alert,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { regMenu } from '../../actions/authActions';
import { getMenuLevel, getProgram, getMenu } from '../../actions/tableActions';
import { clearErrors } from '../../actions/errorActions';
import MenuData from './MenuData';

class MenuReg extends Component {
	constructor() {
		super();

		this.state = {
			ProgramisOpen: false,
			LevelisOpen: false,
			ParentisOpen: false,
			modal: false,
			MenuName: '',
			levelId: null,
			programId: null,
			ParentId: null,
			ParentDisabled: false,
			msg: null,
			MenudropDownValue: 'Please Select',
			ProgramdropDownValue: 'Please Select',
			ParentdropDownValue: 'Please Select',
			visibilityReg: true
		};
	}

	componentDidMount() {
		this.props.GET_MENU_LEVEL();
		this.props.GET_PROGRAM();
		//this.props.GET_MENU_DATA();
		if (this.state.ParentdropDownValue === 'Please Select') {
			this.setState({ ParentDisabled: true });
		}
	}
	componentDidUpdate(prevProps) {
		const { error, RegMenuStatus } = this.props;

		if (RegMenuStatus !== prevProps.RegMenuStatus) {
			this.modeltoggle();
			this.setState({
        MenuName: '',
        levelId: null,
        programId: null,
        ParentId: null,
        MenudropDownValue: "Please Select",
        ProgramdropDownValue: "Please Select",
        ParentdropDownValue: "Please Select",
        ParentDisabled: false
      });
		}

		if (error !== prevProps.error) {
			if (error.id === 'REG_MENU_FAIL') {
				this.setState({ msg: error.msg });
			} else {
				this.setState({ msg: null });
			}
		}
	}

	modeltoggle = () => {

		this.props.CLEAR_ERROR();
		this.setState({ modal: !this.state.modal });
		this.setState({
			MenudropDownValue: 'Please Select',
			ProgramdropDownValue: 'Please Select',
			ParentdropDownValue: 'Please Select',
			MenuName: ''
		});
	};

	Programtoggle() {
		this.setState({ ProgramisOpen: !this.state.ProgramisOpen });
	}
	Parenttoggle() {
		this.setState({ ParentisOpen: !this.state.ParentisOpen });
	}
	Leveltoggle() {
		this.setState({ LevelisOpen: !this.state.LevelisOpen });
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	changeValue(e, name) {
		console.log(e.target.name);
		if (e.target.name === 'programId') {
			this.setState({ [e.target.name]: e.target.id, ProgramdropDownValue: name });
		} else if (e.target.name === 'levelId') {
			if (name === 'Main menu') {
				this.setState({ ParentDisabled: true, ParentdropDownValue: 'Main menu', ParentId: null });
			} else {
				this.setState({ ParentDisabled: false, ParentdropDownValue: 'Please Select' });
			}
			this.setState({ [e.target.name]: e.target.id, MenudropDownValue: name });
		} else if (e.target.name === 'ParentId') {
			this.setState({ [e.target.name]: e.target.id, ParentdropDownValue: name });
		}
	}
	onSubmit = (e) => {
		e.preventDefault();

		const { MenuName, levelId, programId, ParentId } = this.state;
		const newMenu = {
			MenuName,
			levelId,
			programId,
			ParentId
		};
		console.log(JSON.stringify(newMenu));
		this.props.REG_Menu(newMenu);
		
	};

	render() {
		return (
			<div className="app flex-row  ">
				<Modal isOpen={this.state.modal} toggle={this.modeltoggle}>
					<ModalHeader toggle={this.modeltoggle}>Add Menu</ModalHeader>

					<ModalBody>
						<Row className="justify-content-center">
							<Col md="9" lg="8" xl="12">
								<Card className="mx-1">
									<CardBody className="p-4">
										{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
										<Form onSubmit={this.onSubmit}>
											{/* ///Text Name/// */}
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="text"
													placeholder="Menu Name"
													name="MenuName"
													autoComplete="Name"
													onChange={this.onChange}
												/>
											</InputGroup>
											{/* ///drop dwon levels/// */}

											<InputGroup className="mb-3">
												<b className="mr-2">Menu Level name</b>
												<ButtonDropdown
													isOpen={this.state.LevelisOpen}
													toggle={() => {
														this.Leveltoggle();
													}}
												>
													<DropdownToggle caret color="light">
														{this.state.MenudropDownValue}
													</DropdownToggle>
													<DropdownMenu right>
														{this.props.MenuLevel ? (
															this.props.MenuLevel.map((MenuLevel, i) => (
																<div key={i}>
																	<DropdownItem
																		name="levelId"
																		id={MenuLevel.level}
																		onClick={(e) =>
																			this.changeValue(e, MenuLevel.name)}
																	>
																		{MenuLevel.name}
																	</DropdownItem>
																</div>
															))
														) : (
															''
														)}
													</DropdownMenu>
												</ButtonDropdown>
											</InputGroup>
											{/* ///drop down Parent// */}
											<InputGroup className="mb-3">
												<b className="mr-3">Parent name</b>
												<ButtonDropdown
													isOpen={this.state.ParentisOpen}
													toggle={() => {
														this.Parenttoggle();
													}}
												>
													<DropdownToggle
														disabled={this.state.ParentDisabled}
														className="ml-4"
														caret
														color="light"
													>
														{this.state.ParentdropDownValue}
													</DropdownToggle>
													<DropdownMenu right>
														{this.props.MenuData ? (
															this.props.MenuData.map((Parent, i) => (
																<div key={i}>
																	<DropdownItem
																		name="ParentId"
																		id={Parent.MenuId}
																		onClick={(e) =>
																			this.changeValue(e, Parent.MenuName)}
																	>
																		{Parent.MenuName}
																	</DropdownItem>
																</div>
															))
														) : (
															''
														)}
													</DropdownMenu>
												</ButtonDropdown>
											</InputGroup>
											{/* ///drop down Program/// */}
											<InputGroup className="mb-3">
												<b className="mr-4">Program Name</b>
												<ButtonDropdown
													isOpen={this.state.ProgramisOpen}
													toggle={() => {
														this.Programtoggle();
													}}
												>
													<DropdownToggle caret color="light">
														{this.state.ProgramdropDownValue}
													</DropdownToggle>
													<DropdownMenu right>
														{this.props.Program ? (
															this.props.Program.map((Program, i) => (
																<div key={i}>
																	<DropdownItem
																		name="programId"
																		id={Program.id}
																		onClick={(e) =>
																			this.changeValue(e, Program.name)}
																	>
																		{Program.name}
																	</DropdownItem>
																</div>
															))
														) : (
															''
														)}
													</DropdownMenu>
												</ButtonDropdown>
											</InputGroup>
											<Button color="success" block>
												Create Menu
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
								Register New Menu
							</Button>
						) : null}
					</Row>
					<MenuData />
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	RegMenuStatus: state.auth.RegMenuStatus,
	Program: state.table.Program,
	MenuLevel: state.table.MenuLevel,
	MenuData: state.table.MenuData,

	error: state.error
});

const mapDispachToProps = (dispach) => {
	return {
		REG_Menu: (newMenu) => dispach(regMenu(newMenu)),
		GET_MENU_LEVEL: () => dispach(getMenuLevel()),
		GET_PROGRAM: () => dispach(getProgram()),
		GET_MENU_DATA: () => dispach(getMenu()),
		CLEAR_ERROR: () => dispach(clearErrors())
	};
};

export default connect(mapStateToProps, mapDispachToProps)(MenuReg);
