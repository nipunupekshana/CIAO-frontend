const initialState = {
  items: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  const newstate = { ...state };

  switch (action.type) {
    case "ADD_ITEMS":
      return {
        ...state,
        items: [...state.items, action.value]
      };
    case "DELETE_ITEMS":
      console.log("ITEM OBJECT iD" + state.items);
      console.log("ID I GOT" + action.value);
      return {
        ...state,
        items: state.items.filter((item) => item.ID !== action.value)
      };
    case "GET_ITEMS":
      return {
        ...state,
        items: action.value,
        loading: false
      };
    case "LOADING_ITEM":
      return {
        ...state,
        loading: true
      };

    default:
      break;
  }
  return newstate;
};
export default reducer;
