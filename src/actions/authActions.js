import axios from "axios";
import jwt_decode from "jwt-decode";
import { returnErrors } from "./errorActions";
import {
  showusers,
  getUserGroup,
  getUserRoles,
  getAssignedRoles,
  getProgram,
  getMenu,
  getRoleMapping,
  getUserPermission
} from "./tableActions";
import { toast } from "react-toastify";

export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: "USER_LOADING " });

  if (getState().auth.token) {
    const token = getState().auth.token;
    console.log("token is : " + JSON.stringify(jwt_decode(token)));
    dispatch({
      type: "USER_LOADED",
      value: jwt_decode(getState().auth.token)
    });
  } else {
    dispatch({
      type: "AUTH_ERROR"
    });
  }
};

// Register User
export const register = ({
  Name,
  Email,
  Password,
  Username,
  UserTypeID,
  Mobile
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Email,
    Password,
    Username,
    UserTypeID,
    Mobile
  });

  axios
    .post("/api/users", body, config)
    .then((res) => {
      dispatch({
        type: "REGISTER_SUCCESS"
      });

      toast.success("User Registered Successfully!");
      dispatch(showusers());
      dispatch({
        type: "CHANGE_REG_STATE"
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: "REGISTER_FAIL"
      });
    });
};

// Register Usergroup
export const regUserGroup = ({ Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name
  });

  axios
    .post("/api/users/AddUserGroup", body, config)
    .then((res) => {
      dispatch({
        type: "REGISTER_USER_GROUP_SUCCESS"
      });
      toast.success("User Group Registered Successfully!");
      dispatch(getUserGroup());
    })
    .catch((err) => {
      dispatch({
        type: "REGISTER_USER_GROUP_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "REGISTER_USER_GROUP_FAIL"
        )
      );
    });
};

// Register UserRole
export const regUserRole = ({ Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name
  });

  axios
    .post("/api/users/AddUserRole", body, config)
    .then((res) => {
      dispatch({
        type: "REGISTER_USER_ROLE_SUCCESS"
      });
      toast.success("User Role Registered Successfully!");
      dispatch(getUserRoles());
    })
    .catch((err) => {
      dispatch({
        type: "REGISTER_USER_ROLE_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "REGISTER_USER_ROLE_FAIL"
        )
      );
    });
};

// add UserRoleAssinment
export const regUserRoleAssignment = ({ id, roleIDs }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    roleIDs
  });
  console.log(JSON.stringify(body));
  axios
    .post("/api/users/UserRoleAssignment", body, config)
    .then((res) => {
      dispatch({
        type: "USER_ROLE_ASSIGNMENT_SUCCESS"
      });
      dispatch(getAssignedRoles(id));
      toast.success("User Role Assigned Successfully!");
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "USER_ROLE_ASSIGNMENT_FAIL"
        )
      );
    });
};

// add Programme
export const regProgram = ({ Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name
  });
  console.log(JSON.stringify(body));
  axios
    .post("/api/users/regProgram", body, config)
    .then((res) => {
      dispatch({
        type: "REG_PROGRAM_SUCCESS"
      });
      dispatch(getProgram());
      toast.success("Program Added Successfully!");
    })
    .catch((err) => {
      dispatch({
        type: "REG_PROGRAM_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REG_PROGRAM_FAIL")
      );
    });
};

// add Menu
export const regMenu = ({ MenuName, levelId, programId, ParentId }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    MenuName,
    levelId,
    programId,
    ParentId
  });
  console.log(JSON.stringify(body));
  axios
    .post("/api/users/regMenu", body, config)
    .then((res) => {
      dispatch({
        type: "REG_MENU_SUCCESS"
      });
      dispatch(getMenu());
      toast.success("Menu Added Successfully!");
    })
    .catch((err) => {
      dispatch({
        type: "REG_MENU_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REG_MENU_FAIL")
      );
    });
};

// add RollMapping
export const regRoleMapping = (rollMapedData, prompt) => (dispatch) => {
  const {
    roleId,
    ProgramId,
    CreateSwitchedData,
    ReadSwitchedData,
    UpdateSwitchedData,
    DeleteSwitchedData
  } = rollMapedData;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    prompt,
    roleId,
    ProgramId,
    CreateSwitchedData,
    ReadSwitchedData,
    UpdateSwitchedData,
    DeleteSwitchedData
  });

  console.log(JSON.stringify(body));

  axios
    .post("/api/users/regRoleMapping", body, config)
    .then((res) => {
      dispatch(getRoleMapping());
      toast.success("Roles Mapped Successfully!");
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ROLE_MAPIING_FAIL"
        )
      );
    });
};

// add RollMapping
export const regUserPermission = ({
  UserId,
  ProgramId,
  CreateSwitchedData,
  ReadSwitchedData,
  UpdateSwitchedData,
  DeleteSwitchedData
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    UserId,
    ProgramId,
    CreateSwitchedData,
    ReadSwitchedData,
    UpdateSwitchedData,
    DeleteSwitchedData
  });
  console.log(
    UserId,
    ProgramId,
    CreateSwitchedData,
    ReadSwitchedData,
    UpdateSwitchedData,
    DeleteSwitchedData
  );
  console.log(JSON.stringify(body));

  axios
    .post("/api/users/regUserPermission", body, config)
    .then((res) => {
      dispatch({
        type: "USER_PERMISSION_ADDED"
      });
      dispatch(getUserPermission());
      toast.success("User Permission Added Successfully!");
      dispatch({
        type: "CHANGE_USER_PERMISSION_REG_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "USER_PERMISSION_ADDED_FAILED"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REG_USER_FAIL")
      );
    });
};

// LOAD permissions
export const loadPermission = () => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  // const body = JSON.stringify({ UserName, Password });
  // console.log(body);
  axios
    .post("/api/auth/permission", config)
    .then((res) =>
      dispatch({
        type: "PERMISSION_ADDED",
        value: res.data
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

// Login User
export const login = ({ UserName, Password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log("Before Json Username : " + UserName + " Password " + Password);
  // Request body
  const body = JSON.stringify({ UserName, Password });
  console.log(body);
  axios
    .post("/api/auth", body, config)
    .then((res) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        value: res.data
      });
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: "LOGIN_FAIL"
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: "LOGOUT_SUCCESS"
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
