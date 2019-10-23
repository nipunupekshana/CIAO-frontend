/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { updateMenu, deleteMenu, getMenu } from '../../actions/tableActions';

import { toast } from 'react-toastify';

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
	DropdownItem,
	InputGroup,
	ButtonDropdown,
	InputGroupAddon,
	InputGroupText,
	Input,
	DropdownToggle,
	DropdownMenu,
	Alert,
	Container
} from 'reactstrap';

class MenuData extends Component {
	state = {
		modal: false,
		msg: null,

		ProgramisOpen: false,
		LevelisOpen: false,
		ParentisOpen: false,

		ParentDisabled: false,
		ParentDataFiltered: null,

		MenuId: null,
		MenuName: null,
		programId: null,
		levelId: null,
		ParentId: null,

		MenudropDownValue: 'Please Select',
		ProgramdropDownValue: 'Please Select',
		ParentdropDownValue: 'Please Select',

		OldParentdropDownValue: null,
		OldMenudropDownValue: null,
		OldProgramdropDownValue: null,
		visibilityDelete: false
	};
	componentDidMount() {
		const { permissions } = this.props;
		console.log('Visibility update :' + permissions.update);
		if (permissions) {
			if (permissions.name === 'admin') {
				if (permissions.update === 1) {
					this.setState({ visibilityUpdate: false });
				} else {
					this.setState({ visibilityUpdate: true });
				}

				if (permissions.delete === 1) {
					this.setState({ visibilityDelete: false });
				} else {
					this.setState({ visibilityDelete: true });
				}
			}
		}

		this.props.GET_MENU_DATA();
	}

	componentDidUpdate(prevProps) {
		const { error } = this.props;

		if (error !== prevProps.error) {
			if (error.id === 'MENU_DELETE_FAILED') {
				toast.error(error.msg);
			} else {
			}
		}
	}

	modeltoggle = () => {
		//this.props.CLEAR_ERROR();
		this.setState({ modal: !this.state.modal });
	};

	deleteRaw(id) {
		console.log('Index: ', id.MenuId);

		this.props.DELETE_MENU(id.MenuId);
	}
	///update Start

	updateRaw = (id) => {
		console.log(id);
		let ProgramName=null;

		if (id.ParentName) {
			this.props.MenuData.map((PaID) => {
				if (id.ParentName === PaID.MenuName) {
					if (PaID.MenuId) {
						this.setState({ ParentId: PaID.MenuId });
					}
				}
			});
		}

		// eslint-disable-next-line array-callback-return
		this.props.MenuLevel.map((mLvel) => {
			if (id.MenuLevelName === mLvel.name) {
				this.setState({ levelId: mLvel.level });
			}
		});

		// eslint-disable-next-line array-callback-return
		this.props.Program.map((pro) => {
			if (id.ProgramName === pro.name) {
				this.setState({ programId: pro.id });
			}
		});

		///getting Selected Menu Array Filleted
		let arr = this.props.MenuData.filter((Mname) => Mname.MenuName !== id.MenuName);

		this.setState({ ParentDataFiltered: [ ...arr ] });

		if (id.MenuLevelName === 'Main menu') {
			this.setState({ ParentDisabled: true, ParentdropDownValue: 'Please Select' });
		} else {
			this.setState({ ParentDisabled: false, ParentdropDownValue: id.ParentName });
		}
		if (id.ProgramName == null){
			ProgramName = "Please Select";
		}else{
			ProgramName = id.ProgramName;
		}
      this.setState({
        MenuId: id.MenuId,
        MenuName: id.MenuName,
        MenudropDownValue: id.MenuLevelName,
        ProgramdropDownValue: ProgramName
      });

		this.modeltoggle();
	};

	///Update End

	Programtoggle() {
		this.setState({ ProgramisOpen: !this.state.ProgramisOpen });
	}
	Parenttoggle() {
		this.setState({ ParentisOpen: !this.state.ParentisOpen });
	}
	Leveltoggle() {
		this.setState({ LevelisOpen: !this.state.LevelisOpen });
	}

	changeValue(e, name) {
		console.log(e.target.name);
		if (e.target.name === 'programId') {
			this.setState({
				[e.target.name]: e.target.id,
				OldProgramdropDownValue: this.state.ProgramdropDownValue,
				ProgramdropDownValue: name
			});
		} else if (e.target.name === 'levelId') {
			if (name === 'Main menu') {
				this.setState({ ParentDisabled: true, ParentdropDownValue: 'Main menu', ParentId: null });
			} else {
				this.setState({ ParentDisabled: false, ParentdropDownValue: 'Please Select' });
			}
			this.setState({
				[e.target.name]: e.target.id,
				OldMenudropDownValue: this.state.MenudropDownValue,
				MenudropDownValue: name
			});
		} else if (e.target.name === 'ParentId') {
			this.setState({
				[e.target.name]: e.target.id,
				OldParentdropDownValue: this.state.ParentdropDownValue,
				ParentdropDownValue: name
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		let update = false;

		const {
			MenuId,
			MenuName,
			programId,
			levelId,
			ParentId,

			ParentdropDownValue,

			ParentDisabled
		} = this.state;

		if (
			(!ParentDisabled && ParentdropDownValue === 'Please Select') ||
			(!ParentDisabled && ParentdropDownValue === 'Main menu')
		) {
			this.setState({ msg: 'Please Select Parent!' });
			update = false;
		} else {
			if (!MenuName) {
				update = false;
				this.setState({ msg: "Please Fill Menu Name!" });
			} else {
				this.setState({ msg: null });
				update = true;
				console.log('All ok');
				if (update === true) {
					const MenuUpdate = {
						MenuId,
						MenuName,
						programId,
						levelId,
						ParentId
					};
					console.log('UPDATE DATA : ' + MenuId, MenuName, programId, levelId, ParentId);
					this.props.UPDATE_MENU(MenuUpdate);
					this.modeltoggle();
					this.setState({
						programId: null,
						levelId: null,
						ParentId: null
					});
				}
			}
		}
	};

	render() {
		const coulmns = [
			{
				Header: 'Menu Name',
				Cell: (e) => <a href={e.value}>{e.value}</a>,
				accessor: 'MenuName',
				sortable: true,
				filterable: true
			},
			{
				Header: 'Menu Level name',
				accessor: 'MenuLevelName',
				sortable: true,
				filterable: true
			},
			{
				Header: 'Parent Name',
				accessor: 'ParentName',
				sortable: true,
				filterable: true
			},
			{
				Header: 'Program Name',
				accessor: 'ProgramName',
				sortable: true,
				filterable: true
			},
			{
				Header: 'Action',
				Cell: (props) => {
					return (
						<div>
							<Button
								className="mr-2"
								color="danger"
								disabled={this.state.visibilityDelete}
								onClick={() => {
									this.deleteRaw(props.original);
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
														value={this.state.MenuName ? this.state.MenuName : ''}
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
															{this.state.ParentDataFiltered ? (
																this.state.ParentDataFiltered.map((Parent, i) => (
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
													Update Menu
												</Button>
											</Form>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</ModalBody>
					</Modal>
				</div>

				<Row>
					<Col xl={12}>
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify" /> Menu
								<small className="text-muted"> Data</small>
							</CardHeader>
							<CardBody>
								{this.props.MenuData ? (
									<ReactTable
										columns={coulmns}
										data={this.props.MenuData}
										defaultPageSize={10}
										noDataText={'No Users Available'}
									/>
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
	permissions: state.auth.permission,
	MenuData: state.table.MenuData,
	Program: state.table.Program,
	MenuLevel: state.table.MenuLevel,
	error: state.error
});

const mapDispachToProps = (dispach) => {
	return {
		UPDATE_MENU: (user) => dispach(updateMenu(user)),
		DELETE_MENU: (id) => dispach(deleteMenu(id)),

		GET_MENU_DATA: () => dispach(getMenu())
		//CLEAR_ERROR: () => dispach(clearErrors())
	};
};

export default connect(mapStateToProps, mapDispachToProps)(MenuData);
