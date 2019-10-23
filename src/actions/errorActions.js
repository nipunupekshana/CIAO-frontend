export const returnErrors = (msg, status, id = null) => {
  return {
    type: "GET_ERRORS",
    value: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};
