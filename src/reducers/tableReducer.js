const initialState = {
  token: localStorage.getItem("token"),
  users: null,
  usergroup: null,
  Program: null,
  roles: null,
  MenuLevel: null,
  MenuData: null,
  UserPermissionData: null,
  rolePermissionMapData: null,
  assignedRolesOriginal: [],
  assignedRoles: [],
  assignedRolesLoded: false,
  assignedrolesUpdated: false
};

const reducer = (state = initialState, action) => {
  const newstate = {
    ...state
  };

  switch (action.type) {
    case "USER_SHOWED":
      return {
        ...state,
        users: action.value
      };

    case "GET_USER_GROUP":
      return {
        ...state,
        usergroup: action.value
      };
    case "GET_USER_ROLES":
      return {
        ...state,
        roles: action.value
      };
    case "GET_ASSIGNED_ROLES":
      return {
        ...state,
        assignedRolesOriginal: action.value,
        assignedRoles: action.value,
        assignedRolesLoded: true
      };
    case "GET_PROGRAM":
      return {
        ...state,
        Program: action.value
      };
    case "GET_MENU_LEVEL":
      return {
        ...state,
        MenuLevel: action.value
      };

    case "GET_MENU":
      return {
        ...state,
        MenuData: action.value
      };
    case "GET_USER_PERMISSION":
      return {
        ...state,
        UserPermissionData: action.value
      };
    case "ADD_ASSIGNED_ROLES":
      return {
        ...state,
        assignedRoles: action.value,
        assignedrolesUpdated: true,
        assignedRolesLoded: true
      };
    case "GET_ROLE_PERMISSION_MAP":
      return {
        ...state,
        rolePermissionMapData: action.value
      };
    case "USER_DELETED":
      console.log("ID I GOT" + action.value);
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.value)
      };
    case "USER_PERMISSION_DELETED":
      return {
        ...state,
        UserPermissionData: state.UserPermissionData.filter(user => user.userPermissionId !== action.value)
      };
    case "USER_GROUP_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        userrole: state.userrole.filter(
          userGroup => userGroup.id !== action.value
        )
      };
    case "ROLE_PERMISSION_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        rolePermissionMapData: state.rolePermissionMapData.filter(
          RolePermission => RolePermission.id !== action.value
        )
      };

    case "USER_ROLE_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        roles: state.roles.filter(userrole => userrole.id !== action.value)
      };
    case "PROGRAM_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        Program: state.Program.filter(Program => Program.id !== action.value)
      };
    case "MENU_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        MenuData: state.MenuData.filter(Menu => Menu.id !== action.value)
      };
    default:
      break;
  }
  return newstate;
};
export default reducer;
