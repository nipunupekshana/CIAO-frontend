const initialState = {
  CategoryAddStatus: false,
  ProductAddStatus: false,
  ShelfLivesRegStatus: false,
  DeliveryUpdateStatus: false,
  DeliveryStatus: false,
  ItemStatus: false,
  ItemUpdateStatus: false,
  ParaUpdateStatus: false,
  paramStatus: false,
  TaxStatus: false,
  TaxUpdateStatus: false,
  CategoryData: null,
  ParamData: null,
  ProductData: null,
  ShelfData: null,
  DeliveryData: null,
  ItemData: null,
  TaxData: null
};

const reducer = (state = initialState, action) => {
  const newstate = { ...state };

  switch (action.type) {
    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        CategoryAddStatus: true
      };
    case "ADD_CATEGORY_FAIL":
      return {
        ...state,
        CategoryAddStatus: false
      };
    case "GET_CATEGORY_DATA":
      return {
        ...state,
        CategoryData: action.value
      };
    case "CATEGORY_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        CategoryData: state.CategoryData.filter(
          (Category) => Category.id !== action.value
        )
      };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        ProductAddStatus: true
      };
    case "ADD_PRODUCT_FAILL":
      return {
        ...state,
        ProductAddStatus: false
      };
    case "GET_PRODUCT_DATA":
      return {
        ...state,
        ProductData: action.value
      };
    case "PRODUCT_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        ProductData: state.ProductData.filter(
          (Product) => Product.id !== action.value
        )
      };
    case "ADD_SHELF_SUCCESS":
      return {
        ...state,
        ShelfLivesRegStatus: true
      };
    case "ADD_SHELF_FAIL":
      return {
        ...state,
        ShelfLivesRegStatus: false
      };
    case "GET_SHELF_DATA":
      return {
        ...state,
        ShelfData: action.value
      };
    case "SHELF_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        ShelfData: state.ShelfData.filter((Shelf) => Shelf.id !== action.value)
      };
    case "ADD_DELIVERY_TYPE_SUCCESS":
      return {
        ...state,
        DeliveryStatus: true
      };
    case "ADD_DELIVERY_TYPE_FAIL":
      return {
        ...state,
        DeliveryStatus: false
      };
    case "CHANGE_DELIVERY_STATE":
      return {
        ...state,
        DeliveryStatus: false
      };
    case "GET_DELIVERY_DATA":
      return {
        ...state,
        DeliveryData: action.value
      };
    case "DELIVERY_DATA_UPDATED":
      return {
        ...state,
        DeliveryUpdateStatus: true
      };
    case "UPDATE_DELIVERY_DATA_UNSUCCESS":
      return {
        ...state,
        DeliveryUpdateStatus: false
      };
    case "CHANGE_UPDATE_DELIVERY_STATE":
      return {
        ...state,
        DeliveryUpdateStatus: false
      };
    case "ADD_ITEM_SUCCESS":
      return {
        ...state,
        ItemStatus: true
      };
    case "ADD_ITEM_FAIL":
      return {
        ...state,
        ItemStatus: false
      };
    case "CHANGE_ITEM_STATE":
      return {
        ...state,
        ItemStatus: false
      };

    case "GET_ITEM_DATA":
      return {
        ...state,
        ItemData: action.value
      };
    case "ITEM_UPDATED":
      return {
        ...state,
        ItemUpdateStatus: true
      };
    case "CHANGE_ITEM_UPDATE_STATE":
      return {
        ...state,
        ItemUpdateStatus: false
      };
    case "UPDATE_ITEM_UNSUCCESS":
      return {
        ...state,
        ItemUpdateStatus: false
      };

    case "ITEM_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        ItemData: state.ItemData.filter((item) => item.id !== action.value)
      };
    case "ADD_PARAMETER_SUCCESS":
      return {
        ...state,
        paramStatus: true
      };
    case "ADD_PARAMETER_FAIL":
      return {
        ...state,
        paramStatus: false
      };
    case "CHANGE_PARAMETER_STATE":
      return {
        ...state,
        paramStatus: false
      };

    case "GET_PARAMETER_DATA":
      return {
        ...state,
        ParamData: action.value
      };
    case "CHANGE_PARAMETER_UPDATE_STATE":
      return {
        ...state,
        ParaUpdateStatus: false
      };
    case "PARAMETER_UPDATED":
      return {
        ...state,
        ParaUpdateStatus: true
      };

    case "UPDATE_PARAMETER_UNSUCCESS":
      return {
        ...state,
        ParaUpdateStatus: false
      };

    case "PARA_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        ParamData: state.ParamData.filter((para) => para.id !== action.value)
      };

    case "ADD_TAX_TYPE_SUCCESS":
      return {
        ...state,
        TaxStatus: true
      };
    case "ADD_TAX_TYPE_FAIL":
      return {
        ...state,
        TaxStatus: false
      };
    case "CHANGE_TAX_STATE":
      return {
        ...state,
        TaxStatus: false
      };

    case "GET_TAX_DATA":
      return {
        ...state,
        TaxData: action.value
      };
    case "CHANGE_TAX_UPDATE_STATE":
      return {
        ...state,
        TaxUpdateStatus: false
      };
    case "TAX_UPDATED":
      return {
        ...state,
        TaxUpdateStatus: true
      };

    case "UPDATE_TAX_UNSUCCESS":
      return {
        ...state,
        TaxUpdateStatus: false
      };

    case "TAX_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        TaxData: state.TaxData.filter((tax) => tax.id !== action.value)
      };

    default:
      break;
  }
  return newstate;
};
export default reducer;
