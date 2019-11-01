const initialState = {
  AddCusStatus: false,
  CustomerUpdateStatus: false,
  CustomerData: null,
  AddToAddressData: null,
  CusAddressStatus: false,
  cusAddressData: null,
  cusAddressSearchedData: []
};

const reducer = (state = initialState, action) => {
  const newstate = { ...state };

  switch (action.type) {
    case "ADD_CUSTOMER_SUCCESS":
      return {
        ...state,
        AddCusStatus: true
      };
    case "ADD_CUSTOMER_FAIL":
      return {
        ...state,
        AddCusStatus: false
      };
    case "CHANGE_CUSTOMER_STATE":
      return {
        ...state,
        AddCusStatus: false
      };

    case "GET_CUSTOMER_DATA":
      return {
        ...state,
        CustomerData: action.value
      };
    case "CHANGE_CUSTOMER_UPDATE_STATE":
      return {
        ...state,
        CustomerUpdateStatus: false
      };
    case "CUSTOMER_UPDATED":
      return {
        ...state,
        CustomerUpdateStatus: true
      };

    case "UPDATE_CUSTOMER_UNSUCCESS":
      return {
        ...state,
        CustomerUpdateStatus: false
      };

    case "CUSTOMER_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        CustomerData: state.CustomerData.filter(
          (Cus) => Cus.id !== action.value
        )
      };
    case "ADD_TO_ADDRESS":
      return {
        ...state,
        AddToAddressData: action.value
      };

    case "ADD_CUSTOMER_ADDRESS_SUCCESS":
      return {
        ...state,
        CusAddressStatus: true
      };
    case "ADD_CUSTOMER_ADDRESS_FAIL":
      return {
        ...state,
        CusAddressStatus: false
      };
    case "CHANGE_CUSTOMER_ADDRESS_STATE":
      return {
        ...state,
        CusAddressStatus: false
      };

    case "GET_ADDRESS_DATA":
      return {
        ...state,
        cusAddressData: action.value
      };
    case "SET_ADDRESS_DATA_EMPTY":
      return {
        ...state,
        cusAddressData: null
      };
    case "CHANGE_ADDRESS_UPDATE_STATE":
      return {
        ...state,
        CustomerAdressUpdateStatus: false
      };
    case "ADDRESS_UPDATED":
      return {
        ...state,
        CustomerAdressUpdateStatus: true
      };

    case "UPDATE_ADDRESS_UNSUCCESS":
      return {
        ...state,
        CustomerAdressUpdateStatus: false
      };

    case "ADDRESS_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        cusAddressData: state.cusAddressData.filter(
          (CusAddress) => CusAddress.id !== action.value
        )
      };
    case "GET_CUSTOMER_SEARCHED_DATA":
      return {
        ...state,
        cusAddressSearchedData: action.value
      };
    default:
      break;
  }
  return newstate;
};
export default reducer;
