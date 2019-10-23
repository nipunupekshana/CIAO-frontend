const initialState = {
  pageName: "default"
};
const reducer = (state = initialState, action) => {
  const newstate = { ...state };

  switch (action.type) {
    case "default":
      return {
        ...state,
        pageName: action.type
      };
    case "profile":
      return {
        ...state,
        pageName: action.type
      };
    case "report":
      return {
        ...state,
        pageName: action.type
      };
    case "data":
      return {
        ...state,
        pageName: action.type
      };

    default:
      break;
  }
  return newstate;
};
export default reducer;
