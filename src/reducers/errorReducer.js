const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "GET_ERRORS":
      return {
        msg: action.value.msg,
        status: action.value.status,
        id: action.value.id
      };
    case "CLEAR_ERRORS":
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
