import axios from "axios";
import { returnErrors } from "./errorActions";
import {} from "./tableActions";
import { toast } from "react-toastify";

// Register Customer type
export const AddCustomer = ({
  customerTypeId,
  nick,
  name,
  name2,
  counrtyId,

  tel1,
  tel2,
  fax,
  email,
  web,
  currencyId,

  paymentMethodId,
  paymentTermsId,
  incomeTaxNo,
  businessRegNo,

  note,
  SVat,
  regionId,
  customerDiscount,
  taxOptionId
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    customerTypeId,
    nick,
    name,
    name2,
    counrtyId,
    regionId,

    tel1,
    tel2,
    fax,
    email,
    web,
    currencyId,

    paymentMethodId,
    paymentTermsId,
    incomeTaxNo,
    businessRegNo,

    note,
    SVat,

    customerDiscount,
    taxOptionId
  });
  console.log("taxop " + taxOptionId);

  axios
    .post("/api/StakeHolder/AddCustomer", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_CUSTOMER_SUCCESS"
      });
      dispatch(getCustomer());

      dispatch({
        type: "CHANGE_CUSTOMER_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_CUSTOMER_FAIL"
      });
      toast.error("Customer Adding Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_CUSTOMER_FAIL"
        )
      );
    });
};

export const getCustomer = () => (dispatch) => {
  axios
    .get("/api/StakeHolder/getCustomer")
    .then((res) =>
      dispatch({
        type: "GET_CUSTOMER_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("show Customer Data error! : " + err);
    });
};

export const addToAddress = (data) => (dispatch) => {
  console.log("data is : " + data);
  dispatch({
    type: "ADD_TO_ADDRESS",
    value: data
  });
};

// Register Customer type
export const AddAddress = ({
  CustomerId,
  recipient,
  streetAddress1,
  streetAddress2,
  city,
  countryId,
  regionId,

  contactPerson,
  contactNumber,
  isBilling,
  isDelivery
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(
    JSON.stringify(
      CustomerId,
      recipient,
      streetAddress1,
      streetAddress2,
      city,
      countryId,
      regionId,

      contactPerson,
      contactNumber,
      isBilling,
      isDelivery
    )
  );

  // Request body
  const body = JSON.stringify({
    CustomerId,
    recipient,
    streetAddress1,
    streetAddress2,
    city,
    countryId,
    regionId,

    contactPerson,
    contactNumber,
    isBilling,
    isDelivery
  });

  axios
    .post("/api/StakeHolder/AddCusAddress", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_CUSTOMER_ADDRESS_SUCCESS"
      });
      //dispatch(getCustomer());
      toast.success("Address Adding Success!");
      dispatch({
        type: "CHANGE_CUSTOMER_ADDRESS_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_CUSTOMER_ADDRESS_FAIL"
      });
      toast.error("Address Adding Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_CUSTOMER_ADDRESS_FAIL"
        )
      );
    });
};

export const getCustomerSearched = (name) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({
    name
  });
  console.log(name);
  axios
    .post("/api/StakeHolder/getCustomerSearched", body, config)
    .then((res) =>
      dispatch({
        type: "GET_CUSTOMER_SEARCHED_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("show Customer Data error! : " + err);
    });
};

export const getCustomerAddresses = (id) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({
    id
  });
  console.log("got the id " + id);
  axios
    .post("/api/StakeHolder/getCustomerAddress", body, config)
    .then((res) =>
      dispatch({
        type: "GET_ADDRESS_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("show Customer Data error! : " + err);
    });
};

export const makeAddressEmpty = () => (dispatch) => {
  dispatch({
    type: "SET_ADDRESS_DATA_EMPTY"
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
