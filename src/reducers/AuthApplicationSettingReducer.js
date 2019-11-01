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
  CurrencyStatus: false,
  CountryStatus: false,
  CurrencyUpdateStatus: false,
  RegionStatus: false,
  CustomerTypeStatus: false,
  CustomerTypeUpdateStatus: false,
  CustomerConDeptStatus: false,
  CustomerConDeptUpdateStatus: false,
  PaymentMethodUpdateStatus: false,
  PaymentMethodStatus: false,
  InvoiceStatus: false,
  InvoiceUpdateStatus: false,
  PaymentTermStatus: false,
  PaymentTermUpdateStatus: false,
  CategoryData: null,
  ParamData: null,
  ProductData: null,
  ShelfData: null,
  DeliveryData: null,
  ItemData: null,
  TaxData: null,
  CountryData: null,
  CurrencyData: null,
  RegionData: null,
  CustomerTypeData: null,
  CustomerConDeptData: null,
  InvoiceData: null,
  PaymentMethodData: null,
  PaymentTermData: null
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

    case "ADD_COUNTRY_SUCCESS":
      return {
        ...state,
        CountryStatus: true
      };
    case "ADD_COUNTRY_FAIL":
      return {
        ...state,
        CountryStatus: false
      };
    case "CHANGE_COUNTRY_STATE":
      return {
        ...state,
        CountryStatus: false
      };

    case "GET_COUNTRY_DATA":
      return {
        ...state,
        CountryData: action.value
      };
    case "CHANGE_COUNTRY_UPDATE_STATE":
      return {
        ...state,
        CountryUpdateStatus: false
      };
    case "COUNTRY_UPDATED":
      return {
        ...state,
        CountryUpdateStatus: true
      };

    case "UPDATE_COUNTRY_UNSUCCESS":
      return {
        ...state,
        CountryUpdateStatus: false
      };

    case "COUNTRY_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        CountryData: state.CountryData.filter(
          (Country) => Country.id !== action.value
        )
      };

    case "ADD_CURRENCY_SUCCESS":
      return {
        ...state,
        CurrencyStatus: true
      };
    case "ADD_CURRENCY_FAIL":
      return {
        ...state,
        CurrencyStatus: false
      };
    case "CHANGE_CURRENCY_STATE":
      return {
        ...state,
        CurrencyStatus: false
      };

    case "GET_CURRENCY_DATA":
      return {
        ...state,
        CurrencyData: action.value
      };
    case "CHANGE_CURRENCY_UPDATE_STATE":
      return {
        ...state,
        CurrencyUpdateStatus: false
      };
    case "CURRENCY_UPDATED":
      return {
        ...state,
        CurrencyUpdateStatus: true
      };

    case "UPDATE_CURRENCY_UNSUCCESS":
      return {
        ...state,
        CurrencyUpdateStatus: false
      };

    case "CURRENCY_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        CurrencyData: state.CurrencyData.filter(
          (Currency) => Currency.id !== action.value
        )
      };

    case "ADD_REGION_SUCCESS":
      return {
        ...state,
        RegionStatus: true
      };
    case "ADD_REGION_FAIL":
      return {
        ...state,
        RegionStatus: false
      };
    case "CHANGE_REGION_STATE":
      return {
        ...state,
        RegionStatus: false
      };

    case "GET_REGION_DATA":
      return {
        ...state,
        RegionData: action.value
      };
    case "CHANGE_REGION_UPDATE_STATE":
      return {
        ...state,
        RegionUpdateStatus: false
      };
    case "REGION_UPDATED":
      return {
        ...state,
        RegionUpdateStatus: true
      };

    case "UPDATE_REGION_UNSUCCESS":
      return {
        ...state,
        RegionUpdateStatus: false
      };

    case "REGION_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        RegionData: state.RegionData.filter(
          (Region) => Region.id !== action.value
        )
      };
    case "ADD_CUSTOMER_TYPE_SUCCESS":
      return {
        ...state,
        CustomerTypeStatus: true
      };
    case "ADD_CUSTOMER_TYPE_FAIL":
      return {
        ...state,
        CustomerTypeStatus: false
      };
    case "CHANGE_CUSTOMER_TYPE_STATE":
      return {
        ...state,
        CustomerTypeStatus: false
      };

    case "GET_CUSTOMER_TYPE_DATA":
      return {
        ...state,
        CustomerTypeData: action.value
      };
    case "CHANGE_CUSTOMER_TYPE_UPDATE_STATE":
      return {
        ...state,
        CustomerTypeUpdateStatus: false
      };
    case "CUSTOMER_TYPE_UPDATED":
      return {
        ...state,
        CustomerTypeUpdateStatus: true
      };

    case "UPDATE_CUSTOMER_TYPE_UNSUCCESS":
      return {
        ...state,
        CustomerTypeUpdateStatus: false
      };

    case "CUSTOMER_TYPE_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        CustomerTypeData: state.CustomerTypeData.filter(
          (CustomerType) => CustomerType.id !== action.value
        )
      };

    case "ADD_CUSTOMER_CONTACT_DEPARTMENT_SUCCESS":
      return {
        ...state,
        CustomerConDeptStatus: true
      };
    case "ADD_CUSTOMER_CONTACT_DEPARTMENT_FAIL":
      return {
        ...state,
        CustomerConDeptStatus: false
      };
    case "CHANGE_CUSTOMER_CONTACT_DEPARTMENT_STATE":
      return {
        ...state,
        CustomerConDeptStatus: false
      };

    case "GET_CUSTOMER_CONTACT_DEPARTMENT_DATA":
      return {
        ...state,
        CustomerConDeptData: action.value
      };
    case "CHANGE_CUSTOMER_CONTACT_DEPARTMENT_UPDATE_STATE":
      return {
        ...state,
        CustomerConDeptUpdateStatus: false
      };
    case "CUSTOMER_CONTACT_DEPARTMENT_UPDATED":
      return {
        ...state,
        CustomerConDeptUpdateStatus: true
      };

    case "UPDATE_CUSTOMER_CONTACT_DEPARTMENT_UNSUCCESS":
      return {
        ...state,
        CustomerConDeptUpdateStatus: false
      };

    case "CUSTOMER_CONTACT_DEPARTMENT_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        CustomerConDeptData: state.CustomerConDeptData.filter(
          (CustomerConDept) => CustomerConDept.id !== action.value
        )
      };
    case "ADD_INVOICE_SUCCESS":
      return {
        ...state,
        InvoiceStatus: true
      };
    case "ADD_INVOICE_FAIL":
      return {
        ...state,
        InvoiceStatus: false
      };
    case "CHANGE_INVOICE_STATE":
      return {
        ...state,
        InvoiceStatus: false
      };

    case "GET_INVOICE_DATA":
      return {
        ...state,
        InvoiceData: action.value
      };
    case "CHANGE_INVOICE_UPDATE_STATE":
      return {
        ...state,
        InvoiceUpdateStatus: false
      };
    case "INVOICE_UPDATED":
      return {
        ...state,
        InvoiceUpdateStatus: true
      };

    case "UPDATE_INVOICE_UNSUCCESS":
      return {
        ...state,
        InvoiceUpdateStatus: false
      };

    case "INVOICE_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        InvoiceData: state.InvoiceData.filter(
          (Invoice) => Invoice.id !== action.value
        )
      };

    case "ADD_PAYMENT_SUCCESS":
      return {
        ...state,
        PaymentMethodStatus: true
      };
    case "ADD_PAYMENT_FAIL":
      return {
        ...state,
        PaymentMethodStatus: false
      };
    case "CHANGE_PAYMENT_STATE":
      return {
        ...state,
        PaymentMethodStatus: false
      };

    case "GET_PAYMENT_DATA":
      return {
        ...state,
        PaymentMethodData: action.value
      };
    case "CHANGE_PAYMENT_UPDATE_STATE":
      return {
        ...state,
        PaymentMethodUpdateStatus: false
      };
    case "PAYMENT_UPDATED":
      return {
        ...state,
        PaymentMethodUpdateStatus: true
      };

    case "UPDATE_PAYMENT_UNSUCCESS":
      return {
        ...state,
        PaymentMethodUpdateStatus: false
      };

    case "PAYMENT_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        PaymentMethodData: state.PaymentMethodData.filter(
          (pMethod) => pMethod.id !== action.value
        )
      };

    case "ADD_PAYMENT_TERM_SUCCESS":
      return {
        ...state,
        PaymentTermStatus: true
      };
    case "ADD_PAYMENT_TERM_FAIL":
      return {
        ...state,
        PaymentTermStatus: false
      };
    case "CHANGE_PAYMENT_TERM_STATE":
      return {
        ...state,
        PaymentTermStatus: false
      };

    case "GET_PAYMENT_TERM_DATA":
      return {
        ...state,
        PaymentTermData: action.value
      };
    case "CHANGE_PAYMENT_TERM_UPDATE_STATE":
      return {
        ...state,
        PaymentTermUpdateStatus: false
      };
    case "PAYMENT_TERM_UPDATED":
      return {
        ...state,
        PaymentTermUpdateStatus: true
      };

    case "UPDATE_PAYMENT_TERM_UNSUCCESS":
      return {
        ...state,
        PaymentTermUpdateStatus: false
      };

    case "PAYMENT_TERM_DELETED":
      console.log("ID I GOT " + action.value);
      return {
        ...state,
        PaymentTermData: state.PaymentTermData.filter(
          (pTerm) => pTerm.id !== action.value
        )
      };
    default:
      break;
  }
  return newstate;
};
export default reducer;
