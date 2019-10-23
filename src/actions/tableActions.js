import axios from "axios";
import { returnErrors } from "./errorActions";
import { toast } from "react-toastify";

// Show users
export const showusers = () => (dispatch) => {
  axios
    .get("/api/users/users")
    .then((res) =>
      dispatch({
        type: "USER_SHOWED",
        value: res.data
      })
    )
    .catch((err) => {
      //   dispatch(
      //     returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      //   );
      console.log("show user error! : " + err);
    });
};

export const getUserGroup = () => (dispatch) => {
  axios
    .get("/api/users/group")
    .then((res) =>
      dispatch({
        type: "GET_USER_GROUP",
        value: res.data
      })
    )
    .catch((err) => {
      //   dispatch(
      //     returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      //   );
      console.log("show user roles error! : " + err);
    });
};

//updateUserGroup
export const updateUserGroup = ({ id, name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ id, name });

  axios
    .put("/api/users/updateUserGroup", body, config)
    .then((res) => {
      toast.success("User Group Updated Successfully!");
      dispatch(getUserGroup());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_USER_GROUP_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//update program
export const updateProgram = ({ id, name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ id, name });
  console.log(JSON.stringify(body));
  axios
    .put("/api/users/updateProgram", body, config)
    .then((res) => {
      toast.success("Program Updated Successfully!");
      dispatch(getProgram());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PROGRAM_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//update program
export const updateMenu = ({
  MenuId,
  MenuName,
  programId,
  levelId,
  ParentId
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    MenuId,
    MenuName,
    programId,
    levelId,
    ParentId
  });
  console.log(JSON.stringify(body));
  axios
    .put("/api/users/updateMenu", body, config)
    .then((res) => {
      toast.success("Menu Updated Successfully!");
      dispatch(getMenu());
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getUserRoles = () => (dispatch) => {
  axios
    .get("/api/users/roles")
    .then((res) =>
      dispatch({
        type: "GET_USER_ROLES",
        value: res.data
      })
    )
    .catch((err) => {
      //   dispatch(
      //     returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      //   );
      console.log("show user roles error! : " + err);
    });
};

//updateUserRole
export const updateUserRoles = ({ id, name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ id, name });

  axios
    .put("/api/users/updateUserRoles", body, config)
    .then((res) => dispatch(getUserRoles()))
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_USER_ROLES_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete user Role
export const deleteUserRole = ({ id }) => (dispatch) => {
  axios
    .delete(`/api/users/deleteUserRole/${id}`)
    .then((res) => {
      dispatch({
        type: "USER_ROLE_DELETED",
        value: id
      });
      toast.success("User Role Deleted Successfully!");
    })
    .catch((err) => {
      console.log("show userRole error! : " + err);
    });
};

//updateUser
export const updateUser = ({ id, name, username, userGroupId }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ id, name, username, userGroupId });

  axios
    .put("/api/users/updateUser", body, config)
    .then((res) => {
      dispatch(showusers());
      toast.success("User Updated Successfully!");
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_USER_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete user
export const deleteUser = ({ id }) => (dispatch) => {
  axios
    .delete(`/api/users/delete/${id}`)
    .then((res) => {
      dispatch({
        type: "USER_DELETED",
        value: id
      });
      toast.success("User Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Couldn't able to delete user!");
      console.log("show user error! : " + err);
    });
};

//delete user group
export const deleteUserGroup = ({ id }) => (dispatch) => {
  console.log("action id : " + id + "");
  axios
    .delete(`/api/users/deleteUserGroup/${id}`)
    .then((res) => {
      dispatch({
        type: "USER_GROUP_DELETED",
        value: id
      });
      toast.success("User Group Deleted Successfully!");
    })
    .catch((err) => {
      console.log("show user error! : " + err);
    });
};

//get assigned roles
export const getAssignedRoles = (id) => (dispatch) => {
  console.log("Fronend id : " + id);

  axios
    .get(`/api/users/getAssignedRoles/${id}`)
    .then((res) =>
      dispatch({
        type: "GET_ASSIGNED_ROLES",
        value: res.data
      })
    )
    .catch((err) => {
      //   dispatch(
      //     returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      //   );
      console.log("Get Assigned roles error! : " + err);
    });
};

//Add assigned roles
export const addAssignedRoles = (name) => (dispatch) => {
  dispatch({
    type: "ADD_ASSIGNED_ROLES",
    value: name
  });
};

//delete user assigned roles
export const deleteAssignedRoles = ({ roleIDs, id }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id, roleIDs });

  axios
    .post("/api/users/deleteAssignedRoles", body, config)
    .then((res) => {
      dispatch(getAssignedRoles(id));
      toast.success("Assigned Role Updated Successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete Role permission map
export const deleteRolePermissionMap = (
  PermissionId,
  id,
  ProgramId,
  Prompt2
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ PermissionId, id, ProgramId, Prompt2 });
  axios
    .post("/api/users/deleteRolePermission", body, config)
    .then((res) => {
      dispatch({
        type: "ROLE_PERMISSION_DELETED",
        value: id
      });
      toast.success("Role Permission Deleted Successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete User permission
export const deleteUserPermission = (id) => (dispatch) => {
  console.log(JSON.stringify(id));
  axios
    .delete(`/api/users/deleteUserPermission/${id}`)
    .then((res) => {
      dispatch({
        type: "USER_PERMISSION_DELETED",
        value: id
      });
      toast.success("User Permission Deleted Successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

//get Programme data
export const getProgram = () => (dispatch) => {
  axios
    .get(`/api/users/getProgram`)
    .then((res) =>
      dispatch({
        type: "GET_PROGRAM",
        value: res.data
      })
    )
    .catch((err) => {
      //   dispatch(
      //     returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      //   );
      console.log("Get Program error! : " + err);
    });
};

//get User Permission
export const getUserPermission = () => (dispatch) => {
  axios
    .get(`/api/users/getUserPermission`)
    .then((res) =>
      dispatch({
        type: "GET_USER_PERMISSION",
        value: res.data
      })
    )
    .catch((err) => {
      //   dispatch(
      //     returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      //   );
      console.log("Get Program error! : " + err);
    });
};

//get Menu
export const getMenu = () => (dispatch) => {
  axios
    .get(`/api/users/getMenu`)
    .then((res) =>
      dispatch({
        type: "GET_MENU",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Get Menu error! : " + err);
    });
};

//get Role Permission mapping
export const getRoleMapping = () => (dispatch) => {
  axios
    .get(`/api/users/GetRolePermission`)
    .then((res) =>
      dispatch({
        type: "GET_ROLE_PERMISSION_MAP",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Get Role Permission Map error! : " + err);
    });
};

//delete user group
export const deleteProgram = ({ id }) => (dispatch) => {
  axios
    .delete(`/api/users/deleteProgram/${id}`)
    .then((res) => {
      dispatch({
        type: "PROGRAM_DELETED",
        value: id
      });

      toast.success("Program Deleted Successfully!");
    })
    .catch((err) => {
      console.log("Program show error! : " + err);
    });
};

//delete Menu
export const deleteMenu = (id) => async (dispatch) => {
  await axios
    .delete(`/api/users/deleteMenu/${id}`)
    .then((res) => {
      dispatch({
        type: "MENU_DELETED",
        value: { id }
      });
      dispatch(getMenu());
      toast.success("Menu Deleted Successfully!");
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "MENU_DELETE_FAILED"
        )
      );
      console.log(err);
    });
};

//get Menu level
export const getMenuLevel = () => (dispatch) => {
  axios
    .get(`/api/users/getMenuLevel`)
    .then((res) =>
      dispatch({
        type: "GET_MENU_LEVEL",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Get Menu Level error! : " + err);
    });
};

//update RolePermiision mapping
export const updateRolePermissionMap = (
  { id, PermissionId, roleId, programId, c, r, u, d },
  Prompt
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Prompt,
    id,
    PermissionId,
    roleId,
    programId,
    c,
    r,
    u,
    d
  });
  console.log(JSON.stringify(body));
  axios
    .put("/api/users/updateRolePermissionMap", body, config)
    .then((res) => {
      dispatch(getRoleMapping());
      toast.success("Role Permissions Updated Successfully!");
    })

    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_USER_ROLE_MAP_ERROR"
        )
      );
      console.log(err);
    });
};

//update User Permiision
export const updateUserPermission = ({
  PermissionId,
  UserId,
  programId,
  c,
  r,
  u,
  d
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    PermissionId,
    UserId,
    programId,
    c,
    r,
    u,
    d
  });
  console.log(JSON.stringify(body));
  axios
    .put("/api/users/updateUserPermission", body, config)
    .then((res) => {
      dispatch(getUserPermission());
      toast.success("User Permissions Updated Successfully!");
    })

    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_USER__PERMISSION_ERROR"
        )
      );
      console.log(err);
    });
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
