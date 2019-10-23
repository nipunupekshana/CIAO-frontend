/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import 'react-table/react-table.css';
import { connect } from 'react-redux';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import './DualListbox.css';
import {
	getUserRoles,
	getUserGroup,
	getAssignedRoles,
	addAssignedRoles,
	deleteAssignedRoles
} from '../../actions/tableActions';
import { regUserRoleAssignment } from '../../actions/authActions';

import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Button,
	Container,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	ButtonDropdown,
	InputGroupText,
	InputGroup
} from 'reactstrap';

class RoleAssignment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			rawid: null,
			id: null,
			isOpen: false,
			dropDownValue: 'Please Select',
			name: null,
			selected: [],
			options: null,
			newOptions: null,
			visibilityUpdate: false,
			visibilityDelete: false,
			didUpdate: false
		};

		this.data = [];
		this.userRoleIds = [];
	}

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

		this.props.GET_USER_ROLES();
		this.props.GET_USER_GROUP();
	}

	componentDidUpdate(prevProps) {
		const { usersroles } = this.props;
		console.log(this.state.didUpdate);

		if (usersroles !== prevProps.usersroles) {
			this.props.usersroles.forEach((v, i) => {
				this.data = [ ...this.data, { id: v.id, value: v.name, label: v.name } ];
				console.log(this.data);
			});

			console.log(JSON.stringify(this.data));
			console.log('im called this');
			if (!this.state.didUpdate) {
				this.setState({ didUpdate: true });
			}
		}
	}
	toggle() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	changeValue(e) {
		console.log(e.target.name);
		this.props.GET_ASSIGNED_ROLES(e.target.id);

		this.setState({ dropDownValue: e.target.name, id: e.target.id }, () => {
			console.log(this.state.id);
		});
	}

	//   getRow(id) {
	//     return this.props.usersroles.findIndex(row => {
	//       return row.id === id;
	//     });
	//   }

	//   updateRaw = id => {
	//     const rawid = this.getRow(id);

	//     this.setState({ rawid: rawid });
	//     if (rawid != null && this.props.usersroles != null) {
	//       //let userid = this.props.usersGroupData[rawid].userGroupId;

	//       this.setState({
	//         name: this.props.usersroles[rawid].name,
	//         id: this.props.usersroles[rawid].id
	//       });
	//       //this.getUserRoleName(userid);
	//       this.modeltoggle();
	//     }
	//   };
	onChangeListBox(selected) {
		//this.setState({ selected: selected }, () => console.log('avaliable data ' + this.state.selected));

		this.props.ADD_ASSIGNED_ROLES(selected);
	}
	assignRoles() {
		const { id } = this.state;
		let res = [];
		let deletes = [];
		this.userRoleIds = [];
		let same = [];
		///check original roles are empty
		if (this.props.assignedRolesOriginal.length > 0) {
			//check same roles are updating

			this.props.assignedRoles.map((a) => {
				this.props.assignedRolesOriginal.map((v) => {
					if (a === v) {
						same = [ ...same, a ];
					}
				});
			});
			console.log('data array data : ' + JSON.stringify(this.data));
			res = this.props.assignedRoles.filter((f) => !same.includes(f));
			console.log('res size: ' + res.length);

			if (res.length <= 0) {
				console.log(
					"let's fine whats deleted :" +
						this.props.assignedRolesOriginal.filter((e) => !this.props.assignedRoles.includes(e))
				);
				deletes = this.props.assignedRolesOriginal.filter((e) => !this.props.assignedRoles.includes(e));
			}
			////
			console.log('array values to delete  ' + deletes);

			////original roles are empty
		} else {
			this.props.assignedRoles.map((n) => {
				this.props.usersroles.map((v) => {
					if (n === v.name) {
						this.userRoleIds = [ ...this.userRoleIds, v.id ];
						return 1;
					}
				});
			});

			const roleIDs = [ ...this.userRoleIds ];
			console.log(" empty id's " + roleIDs);
			const newUserRoleAssigned = {
				roleIDs,
				id
			};
			this.props.USER_ROLE_ASSIGNMENT(newUserRoleAssigned);
		}

		console.log('array values userroles ' + JSON.stringify(this.props.usersroles));
		console.log('array values assign : ' + JSON.stringify(this.props.assignedRoles));
		if (res.length > 0) {
			res.map((n) => {
				this.props.usersroles.map((v) => {
					if (n === v.name) {
						this.userRoleIds = [ ...this.userRoleIds, v.id ];
						return 1;
					}
				});
			});

			const roleIDs = [ ...this.userRoleIds ];
			console.log(" id's " + roleIDs);
			const newUserRoleAssigned = {
				roleIDs,
				id
			};
			this.props.USER_ROLE_ASSIGNMENT(newUserRoleAssigned);
		} else if (deletes.length > 0) {
			deletes.map((n) => {
				this.props.usersroles.map((v) => {
					if (n === v.name) {
						this.userRoleIds = [ ...this.userRoleIds, v.id ];
						return 1;
					}
				});
			});

			const roleIDs = [ ...this.userRoleIds ];
			console.log(" id's " + roleIDs);
			const UserRoleToDelete = {
				roleIDs,
				id
			};
			this.props.DELETE_ASSIGNED_ROLES(UserRoleToDelete);
		}

		console.log("Array id's " + this.userRoleIds);
	}

	render() {
		return (
			<div className="animated fadeIn">
				<Row>
					<Col xl={12}>
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify" /> User Roles Assignment
							</CardHeader>
							<CardBody>
								<Container>
									<Row>
										<Col>
											<InputGroup className="mb-3">
												<InputGroupText className="mr-2">User Group</InputGroupText>
												<ButtonDropdown
													isOpen={this.state.isOpen}
													toggle={() => {
														this.toggle();
													}}
												>
													<DropdownToggle caret color="light">
														{this.state.dropDownValue}
													</DropdownToggle>
													<DropdownMenu right>
														{this.props.usergroup ? (
															this.props.usergroup.map((val, i) => (
																<div key={i}>
																	<DropdownItem
																		name={val.name}
																		id={val.id}
																		onClick={(e) => this.changeValue(e)}
																	>
																		{val.name}
																	</DropdownItem>
																</div>
															))
														) : (
															''
														)}
													</DropdownMenu>
												</ButtonDropdown>
											</InputGroup>
											<b className='pb-2'>User Roles</b>
										</Col>
										<Col className="ml-4">
											<InputGroup className='mb-3'>
												<InputGroupText className="mr-2">
													User Group name:{' '}
													{this.state.dropDownValue !== 'Please Select' ? (
														<b className="ml-2">{this.state.dropDownValue}</b>
													) : (
														''
													)}{' '}
												</InputGroupText>
											</InputGroup>
											<b>Assigned User Roles</b>
										</Col>
									</Row>
									<Row className="dualbox">
										<Col>
											<DualListBox
												disabled={this.state.dropDownValue !== 'Please Select' ? false : true}
												options={this.state.didUpdate ? this.data : []}
												selected={this.props.assignedRolesLoded ? this.props.assignedRoles : []}
												onChange={(e) => this.onChangeListBox(e)}
											/>
										</Col>
									</Row>
									<Button
										hidden={this.props.assignedrolesUpdated ? false : true}
										className="mt-4 animated fadeIn"
										color="success"
										block
										onClick={() => this.assignRoles()}
									>
										Update Selected Roles
									</Button>
								</Container>
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
	usersroles: state.table.roles,
	usergroup: state.table.usergroup,
	assignedRoles: state.table.assignedRoles,
	assignedRolesOriginal: state.table.assignedRolesOriginal,
	assignedRolesLoded: state.table.assignedRolesLoded,
	assignedrolesUpdated: state.table.assignedrolesUpdated
});

const mapDispachToProps = (dispach) => {
	return {
		GET_USER_ROLES: () => dispach(getUserRoles()),
		GET_USER_GROUP: () => dispach(getUserGroup()),
		USER_ROLE_ASSIGNMENT: (data) => dispach(regUserRoleAssignment(data)),
		GET_ASSIGNED_ROLES: (id) => dispach(getAssignedRoles(id)),
		ADD_ASSIGNED_ROLES: (data) => dispach(addAssignedRoles(data)),
		DELETE_ASSIGNED_ROLES: (data) => dispach(deleteAssignedRoles(data))
		//CLEAR_ERROR: () => dispach(clearErrors())
	};
};

export default connect(mapStateToProps, mapDispachToProps)(RoleAssignment);
