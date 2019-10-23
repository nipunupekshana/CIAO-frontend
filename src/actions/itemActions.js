import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const addItems = (item) => (dispatch, getState) => {
  dispatch(loadingitems());
  console.log("im item action : " + item.name);

  axios
    .post("/api/items", item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "ADD_ITEMS",
        value: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItems = (id) => (dispatch, getState) => {
  dispatch(loadingitems());
  // const UserType = getState().auth.user.UserType;
  // console.log("User type is: " + UserType);
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // };

  // const body = JSON.stringify({ UserType });

  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "DELETE_ITEMS",
        value: id
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "USER_NOT_ALLOWED")
      )
    );
};

export const getItems = () => (dispatch, getState) => {
  dispatch(loadingitems());
  axios
    .get("/api/items", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "GET_ITEMS",
        value: res.data
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const loadingitems = () => {
  return {
    type: "LOADING_ITEM"
  };
};
