const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  isAuthenicated: null,
  RegStatus: false,
  addUGrpStatus: false,
  addRoleStatus: false,
  addProgramStatus: false,
  RegMenuStatus: false,
  RegUPermissionStatus: false,
  user: null,
  permission: {
    name: "admin",
    create: 1,
    read: 1,
    update: 1,
    delete: 1
  }
};

const reducer = (state = initialState, action) => {
  const newstate = {
    ...state
  };

  switch (action.type) {
    case "USER-LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "USER_LOADED":
      console.log("im at USER LOADED " + action.value);
      return {
        ...state,
        isAuthenicated: true,
        isLoading: false,
        user: action.value
      };

    case "PERMISSION_ADDED":
      console.log("im at permissions " + action.value);
      return {
        ...state,
        permission: action.value
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.value.token);

      return {
        ...state,
        ...action.value,
        isAuthenicated: true,
        isLoading: false
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        RegStatus: true
      };

    case "USER_PERMISSION_ADDED":
      return {
        ...state,
        RegUPermissionStatus: true
      };
    case "CHANGE_USER_PERMISSION_REG_STATE":
    case "USER_PERMISSION_ADDED_FAILED":
      return {
        ...state,
        RegUPermissionStatus: false
      };

    case "CHANGE_REG_STATE":
      return {
        ...state,
        RegStatus: false
      };
    case "REGISTER_USER_GROUP_SUCCESS":
      return {
        ...state,
        addUGrpStatus: true
      };
    case "REGISTER_USER_GROUP_FAIL":
      return {
        ...state,
        addUGrpStatus: false
      };
    case "REGISTER_USER_ROLE_SUCCESS":
      return {
        ...state,
        addRoleStatus: true
      };
    case "REGISTER_USER_ROLE_FAIL":
      return {
        ...state,
        addRoleStatus: false
      };
    case "REG_PROGRAM_SUCCESS":
      return {
        ...state,
        addProgramStatus: true
      };
    case "REG_PROGRAM_FAIL":
      return {
        ...state,
        addProgramStatus: false
      };
    case "REG_MENU_SUCCESS":
      return {
        ...state,
        RegMenuStatus: true
      };
    case "REG_MENU_FAIL":
      return {
        ...state,
        RegMenuStatus: false
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenicated: false,
        isLoading: false
      };

    default:
      break;
  }
  return newstate;
};
export default reducer;
