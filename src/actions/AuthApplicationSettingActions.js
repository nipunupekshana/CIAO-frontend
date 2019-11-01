import axios from "axios";
import { returnErrors } from "./errorActions";
import {} from "./tableActions";
import { toast } from "react-toastify";

// Register Category
export const AddCategory = ({ Name, Description }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Description
  });

  axios
    .post("/api/appSetting/AddCategory", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_CATEGORY_SUCCESS"
      });
      dispatch(getCategoryData());
      toast.success("Category Added Successfully!");
    })
    .catch((err) => {
      dispatch({
        type: "ADD_CATEGORY_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_CATEGORY_FAIL"
        )
      );
    });
};

export const getCategoryData = () => (dispatch) => {
  axios
    .get("/api/appSetting/CategoryData")
    .then((res) =>
      dispatch({
        type: "GET_CATEGORY_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Category Data error! : " + err);
    });
};

//update Category
export const updateCategory = ({ id, name, Description }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(id, name, Description);
  // Request body
  const body = JSON.stringify({
    id,
    name,
    Description
  });

  axios
    .put("/api/appSetting/updateCategoryData", body, config)
    .then((res) => {
      toast.success("Category Data Updated Successfully!");
      dispatch(getCategoryData());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_CATEGORY_DATA_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Category
export const deleteCategory = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteCategory/${id}`)
    .then((res) => {
      dispatch({
        type: "CATEGORY_DELETED",
        value: id
      });
      toast.success("Category Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Category Delete Failed!");
      console.log("Category Delete error! : " + err);
    });
};

// Register Product
export const AddProduct = ({ Name, Description, CatId }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Description,
    CatId
  });

  axios
    .post("/api/appSetting/AddProduct", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_PRODUCT_SUCCESS"
      });
      dispatch(getProductData());
      toast.success("Product Added Successfully!");
    })
    .catch((err) => {
      dispatch({
        type: "ADD_PRODUCT_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_PRODUCT_FAIL")
      );
    });
};

export const getProductData = () => (dispatch) => {
  axios
    .get("/api/appSetting/ProdcutData")
    .then((res) =>
      dispatch({
        type: "GET_PRODUCT_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Product Data error! : " + err);
    });
};

//update Product
export const updateProduct = ({ id, name, Description, CatId }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(id, name, Description, CatId);
  // Request body
  const body = JSON.stringify({
    id,
    name,
    Description,
    CatId
  });

  axios
    .put("/api/appSetting/updateProductData", body, config)
    .then((res) => {
      toast.success("Product Data Updated Successfully!");
      dispatch(getProductData());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PRODUCT_DATA_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Produc
export const deleteProduct = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteProduct/${id}`)
    .then((res) => {
      dispatch({
        type: "PRODUCT_DELETED",
        value: id
      });
      toast.success("Product Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Product Delete Failed!");
      console.log("Product Delete error! : " + err);
    });
};

// Register Shelf
export const AddShelf = ({ TemperaturedropDownValue, State, Temperature }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    TemperaturedropDownValue,
    State,
    Temperature
  });

  axios
    .post("/api/appSetting/AddShelf", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_SHELF_SUCCESS"
      });
      dispatch(getShelfData());
      toast.success("ShelfLife Added Successfully!");
    })
    .catch((err) => {
      dispatch({
        type: "ADD_SHELF_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_SHELF_FAIL")
      );
    });
};

export const getShelfData = () => (dispatch) => {
  axios
    .get("/api/appSetting/ShelfData")
    .then((res) =>
      dispatch({
        type: "GET_SHELF_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Shelf Data error! : " + err);
    });
};

//update Shelf
export const updateShelf = ({
  State,
  id,
  Temperature,
  TemperaturedropDownValue
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(State, id, Temperature, TemperaturedropDownValue);
  // Request body
  const body = JSON.stringify({
    State,
    id,
    Temperature,
    TemperaturedropDownValue
  });

  axios
    .put("/api/appSetting/updateShelfData", body, config)
    .then((res) => {
      toast.success("Shelf Data Updated Successfully!");
      dispatch(getShelfData());
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_SHELF_DATA_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Produc
export const deleteShelf = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteShelf/${id}`)
    .then((res) => {
      dispatch({
        type: "SHELF_DELETED",
        value: id
      });
      toast.success("Shelf Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Shelf Delete Failed!");
      console.log("Shelf Delete error! : " + err);
    });
};

// Register Delivery type
export const AddDeliveryType = ({
  Name,
  Weght,
  WeightdropDownValue,
  Description,
  lowWeight,
  UpWeight,
  Items,
  IsApproxWeight,
  IsWeightRange,
  IsBundled
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Weght,
    WeightdropDownValue,
    Description,
    lowWeight,
    UpWeight,
    Items,
    IsApproxWeight,
    IsWeightRange,
    IsBundled
  });

  console.log(
    Name,
    Weght,
    WeightdropDownValue,
    Description,
    lowWeight,
    UpWeight,
    Items,
    IsApproxWeight,
    IsWeightRange,
    IsBundled
  );

  axios
    .post("/api/appSetting/AddDeliveryType", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_DELIVERY_TYPE_SUCCESS"
      });
      dispatch(getDeliveryData());
      toast.success("Delivery Type Added Successfully!");
      dispatch({
        type: "CHANGE_DELIVERY_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_DELIVERY_TYPE_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_DELIVERY_TYPE_FAIL"
        )
      );
    });
};

export const getDeliveryData = () => (dispatch) => {
  axios
    .get("/api/appSetting/DeliveryData")
    .then((res) =>
      dispatch({
        type: "GET_DELIVERY_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Delivery Data error! : " + err);
    });
};

//update Delivery
export const updateDelivery = ({
  id,
  Name,
  Weght,
  WeightUnitdropDownValue,
  Description,
  lowWeight,
  UpWeight,
  Items,
  IsApproxWeight,
  IsWeightRange,
  IsBundled
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name,
    Weght,
    WeightUnitdropDownValue,
    Description,
    lowWeight,
    UpWeight,
    Items,
    IsApproxWeight,
    IsWeightRange,
    IsBundled
  });

  axios
    .put("/api/appSetting/updateDeliveryData", body, config)
    .then((res) => {
      dispatch({
        type: "DELIVERY_DATA_UPDATED"
      });
      toast.success("Delivery Data Updated Successfully!");
      dispatch(getDeliveryData());
      dispatch({
        type: "CHANGE_UPDATE_DELIVERY_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_DELIVERY_DATA_UNSUCCESS"
      });
      toast.error("Delivery Data Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_DELIVERY_DATA_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Delivery
export const deleteDelivery = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteDelivery/${id}`)
    .then((res) => {
      dispatch({
        type: "DELIVERY_DELETED",
        value: id
      });
      toast.success("Delivery Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Delivery Delete Failed!");
      console.log("Delivery Delete error! : " + err);
    });
};

// add item
export const AddItem = ({
  Name,
  Description,
  DelId,
  shelfId,
  ProId,
  Price,
  Duaration,
  DuarationdropDownValue
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Description,
    DelId,
    shelfId,
    ProId,
    Price,
    Duaration,
    DuarationdropDownValue
  });

  axios
    .post("/api/appSetting/AddItem", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_ITEM_SUCCESS"
      });
      dispatch(getItemData());
      toast.success("Item Added Successfully!");
      dispatch({ type: "CHANGE_ITEM_STATE" });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_ITEM_FAIL"
      });
      toast.error("Item Adding Failed!");
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_ITEM_FAIL")
      );
    });
};

export const getItemData = () => (dispatch) => {
  axios
    .get("/api/appSetting/ItemData")
    .then((res) =>
      dispatch({
        type: "GET_ITEM_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Item Data error! : " + err);
    });
};

//update item
export const updateItem = ({
  id,
  Name,
  Description,
  DuarationdropDownValue,
  DelId,
  shelfId,
  ProId,
  Price,
  Duaration,
  originalData
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name,
    Description,
    DuarationdropDownValue,
    DelId,
    shelfId,
    ProId,
    Price,
    Duaration,
    originalData
  });

  axios
    .put("/api/appSetting/updateItemData", body, config)
    .then((res) => {
      dispatch({
        type: "ITEM_UPDATED"
      });
      toast.success("Item Updated Successfully!");
      dispatch(getItemData());
      dispatch({
        type: "CHANGE_ITEM_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_ITEM_UNSUCCESS"
      });
      toast.error("Item Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_ITEM_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Item
export const deleteItem = ({ productid, itemId }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    productid,
    itemId
  });

  axios
    .post(`/api/appSetting/deleteItem`, body, config)
    .then((res) => {
      dispatch({
        type: "ITEM_DELETED",
        value: itemId
      });
      toast.success("Item Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Item Delete Failed!");
      console.log("Item Delete error! : " + err);
    });
};

// add parameter
export const AddParameter = ({
  Name,
  Description,
  value,
  DataTypedropDownValue
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Description,
    value,
    DataTypedropDownValue
  });

  axios
    .post("/api/appSetting/AddParameter", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_PARAMETER_SUCCESS"
      });
      dispatch(getParameterData());
      toast.success("Parameter Added Successfully!");
      dispatch({ type: "CHANGE_PARAMETER_STATE" });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_PARAMETER_FAIL"
      });
      toast.error("Parameter Adding Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_PARAMETER_FAIL"
        )
      );
    });
};

export const getParameterData = () => (dispatch) => {
  axios
    .get("/api/appSetting/ParameterData")
    .then((res) =>
      dispatch({
        type: "GET_PARAMETER_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show parameter Data error! : " + err);
    });
};

//update parameter
export const updateParameter = ({
  id,
  Name,
  Description,
  value,
  DataTypedropDownValue
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name,
    Description,
    value,
    DataTypedropDownValue
  });

  axios
    .put("/api/appSetting/updateParaData", body, config)
    .then((res) => {
      dispatch({
        type: "PARAMETER_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getParameterData());
      dispatch({
        type: "CHANGE_PARAMETER_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_PARAMETER_UNSUCCESS"
      });
      toast.error("Parameter Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PARAMETER_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Para
export const deletePara = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deletePara/${id}`)
    .then((res) => {
      dispatch({
        type: "PARA_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("para Delete error! : " + err);
    });
};

// Register Taxtype
export const AddTaxType = ({
  Name,
  PriotirydropDownValue,
  Description,
  Percentage,
  TaxOnTax
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    PriotirydropDownValue,
    Description,
    Percentage,
    TaxOnTax
  });

  console.log(Name, PriotirydropDownValue, Description, Percentage, TaxOnTax);

  axios
    .post("/api/appSetting/AddTaxType", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_TAX_TYPE_SUCCESS"
      });
      dispatch(getDeliveryData());
      toast.success("Tax Type Added Successfully!");
      dispatch({
        type: "CHANGE_TAX_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_TAX_TYPE_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_TAX_TYPE_FAIL"
        )
      );
    });
};

export const getTaxData = () => (dispatch) => {
  axios
    .get("/api/appSetting/TaxData")
    .then((res) =>
      dispatch({
        type: "GET_TAX_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Tax Data error! : " + err);
    });
};

//update parameter
export const updateVat = ({
  id,
  PriotirydropDownValue,
  Name,
  Description,
  Percentage,
  TaxOnTax
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    PriotirydropDownValue,
    Name,
    Description,
    Percentage,
    TaxOnTax
  });

  axios
    .put("/api/appSetting/updateVATData", body, config)
    .then((res) => {
      dispatch({
        type: "TAX_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getTaxData());
      dispatch({
        type: "CHANGE_TAX_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_TAX_UNSUCCESS"
      });
      toast.error("Vat Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_TAX_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Tax
export const deleteTax = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteTax/${id}`)
    .then((res) => {
      dispatch({
        type: "TAX_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register Taxtype
export const AddCountry = ({ Name, Abbreviation }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    Abbreviation
  });

  console.log(Name, Abbreviation);

  axios
    .post("/api/appSetting/AddCountry", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_COUNTRY_SUCCESS"
      });
      dispatch(getCountry());
      toast.success("Country Name Added Successfully!");
      dispatch({
        type: "CHANGE_COUNTRY_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_COUNTRY_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_COUNTRY_FAIL")
      );
    });
};

export const getCountry = () => (dispatch) => {
  axios
    .get("/api/appSetting/CountryData")
    .then((res) =>
      dispatch({
        type: "GET_COUNTRY_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Tax Data error! : " + err);
    });
};

//update parameter
export const updateCountry = ({ id, Name, Abbreviation }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name,
    Abbreviation
  });

  axios
    .put("/api/appSetting/updateCountryData", body, config)
    .then((res) => {
      dispatch({
        type: "COUNTRY_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getCountry());
      dispatch({
        type: "CHANGE_COUNTRY_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_COUNTRY_UNSUCCESS"
      });
      toast.error("Country Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_COUNTRY_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Tax
export const deleteCountry = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteCountry/${id}`)
    .then((res) => {
      dispatch({
        type: "COUNTRY_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register Currency
export const AddCurrency = ({
  Name,
  abbreviation,
  buyRate,
  sellrate,
  decimalPlaces
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    abbreviation,
    buyRate,
    sellrate,
    decimalPlaces
  });

  console.log(Name, abbreviation, buyRate, sellrate, decimalPlaces);

  axios
    .post("/api/appSetting/AddCurrency", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_CURRENCY_SUCCESS"
      });
      dispatch(getCurrency());
      toast.success("Currency Data Added Successfully!");
      dispatch({
        type: "CHANGE_CURRENCY_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_CURRENCY_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_CURRENCY_FAIL"
        )
      );
    });
};

export const getCurrency = () => (dispatch) => {
  axios
    .get("/api/appSetting/CurrencyData")
    .then((res) =>
      dispatch({
        type: "GET_CURRENCY_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Currency Data error! : " + err);
    });
};

//update parameter
export const updateCurrency = ({
  id,
  Name,
  abbreviation,
  buyRate,
  sellrate,
  decimalPlaces
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name,
    abbreviation,
    buyRate,
    sellrate,
    decimalPlaces
  });

  axios
    .put("/api/appSetting/updateCurrencyData", body, config)
    .then((res) => {
      dispatch({
        type: "CURRENCY_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getCurrency());
      dispatch({
        type: "CHANGE_CURRENCY_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_CURRENCY_UNSUCCESS"
      });
      toast.error("Currency Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_CURRENCY_UNSUCCESS"
        )
      );
      console.log(err);
    });
};
//delete Currency
export const deleteCurrency = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteCurrency/${id}`)
    .then((res) => {
      dispatch({
        type: "CURRENCY_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register Currency
export const AddRegion = ({ Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name
  });

  console.log(Name);

  axios
    .post("/api/appSetting/AddRegion", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_REGION_SUCCESS"
      });
      dispatch(getRegion());
      toast.success("Region Data Added Successfully!");
      dispatch({
        type: "CHANGE_REGION_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_REGION_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_REGION_FAIL")
      );
    });
};

export const getRegion = () => (dispatch) => {
  axios
    .get("/api/appSetting/RegionData")
    .then((res) =>
      dispatch({
        type: "GET_REGION_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Region Data error! : " + err);
    });
};

//update parameter
export const updateRegion = ({ id, Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name
  });

  axios
    .put("/api/appSetting/updateRegionData", body, config)
    .then((res) => {
      dispatch({
        type: "REGION_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getRegion());
      dispatch({
        type: "CHANGE_REGION_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_REGION_UNSUCCESS"
      });
      toast.error("Region Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_REGION_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Region
export const deleteRegion = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteRegion/${id}`)
    .then((res) => {
      dispatch({
        type: "REGION_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register Customer type
export const AddCustomerType = ({ Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name
  });

  console.log(Name);

  axios
    .post("/api/appSetting/AddCustomerType", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_CUSTOMER_TYPE_SUCCESS"
      });
      dispatch(getCustomerType());
      toast.success("Customer type Data Added Successfully!");
      dispatch({
        type: "CHANGE_CUSTOMER_TYPE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_CUSTOMER_TYPE_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_CUSTOMER_TYPE_FAIL"
        )
      );
    });
};

export const getCustomerType = () => (dispatch) => {
  axios
    .get("/api/appSetting/CustomerTypeData")
    .then((res) =>
      dispatch({
        type: "GET_CUSTOMER_TYPE_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Customer Type Data error! : " + err);
    });
};

//update CustomerType
export const updateCustomerType = ({ id, Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name
  });

  axios
    .put("/api/appSetting/updateCustomerTypeData", body, config)
    .then((res) => {
      dispatch({
        type: "CUSTOMER_TYPE_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getCustomerType());
      dispatch({
        type: "CHANGE_CUSTOMER_TYPE_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_CUSTOMER_TYPE_UNSUCCESS"
      });
      toast.error("Region Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_CUSTOMER_TYPE_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Region
export const deleteCustomerType = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteCustomerType/${id}`)
    .then((res) => {
      dispatch({
        type: "CUSTOMER_TYPE_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register Customer type
export const AddCustomerConDept = ({ Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name
  });

  console.log(Name);

  axios
    .post("/api/appSetting/AddCustomerConDept", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_CUSTOMER_CONTACT_DEPARTMENT_SUCCESS"
      });
      dispatch(getCustomerConDept());
      toast.success("Data Added Successfully!");
      dispatch({
        type: "CHANGE_CUSTOMER_CONTACT_DEPARTMENT_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_CUSTOMER_CONTACT_DEPARTMENT_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_CUSTOMER_CONTACT_DEPARTMENT_FAIL"
        )
      );
    });
};

export const getCustomerConDept = () => (dispatch) => {
  axios
    .get("/api/appSetting/CustomerConDeptData")
    .then((res) =>
      dispatch({
        type: "GET_CUSTOMER_CONTACT_DEPARTMENT_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show Customer Contact Department Data error! : " + err);
    });
};

//update CustomerType
export const updateCustomerConDept = ({ id, Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name
  });

  axios
    .put("/api/appSetting/updateCustomerConDeptData", body, config)
    .then((res) => {
      dispatch({
        type: "CUSTOMER_CONTACT_DEPARTMENT_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getCustomerConDept());
      dispatch({
        type: "CHANGE_CUSTOMER_CONTACT_DEPARTMENT_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_CUSTOMER_CONTACT_DEPARTMENT_UNSUCCESS"
      });
      toast.error("Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_CUSTOMER_CONTACT_DEPARTMENT_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Region
export const deleteCustomerConDept = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteCustomerConDept/${id}`)
    .then((res) => {
      dispatch({
        type: "CUSTOMER_CONTACT_DEPARTMENT_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register invoice
export const AddInvoice = ({ Name, suffix, nextNumber }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    suffix,
    nextNumber
  });

  axios
    .post("/api/appSetting/AddInvoice", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_INVOICE_SUCCESS"
      });
      dispatch(getInvoice());
      toast.success("Invoice Added Successfully!");
      dispatch({
        type: "CHANGE_INVOICE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_INVOICE_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_INVOICE_FAIL")
      );
    });
};

export const getInvoice = () => (dispatch) => {
  axios
    .get("/api/appSetting/invoiceData")
    .then((res) =>
      dispatch({
        type: "GET_INVOICE_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("Show invoice Data error! : " + err);
    });
};

//update CustomerType
export const updateInvoice = ({ id, Name, suffix, nextNumber }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name,
    suffix,
    nextNumber
  });

  axios
    .put("/api/appSetting/updateInvoiceData", body, config)
    .then((res) => {
      dispatch({
        type: "INVOICE_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getInvoice());
      dispatch({
        type: "CHANGE_INVOICE_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_INVOICE_UNSUCCESS"
      });
      toast.error("Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_INVOICE_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Region
export const deleteInvoice = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/deleteinvoice/${id}`)
    .then((res) => {
      dispatch({
        type: "INVOICE_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register Customer type
export const AddPaymentMethod = ({ Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name
  });

  console.log(Name);

  axios
    .post("/api/appSetting/AddPaymentMethod", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_PAYMENT_SUCCESS"
      });
      dispatch(getPaymentMethod());
      toast.success("Payment Method Added Successfully!");
      dispatch({
        type: "CHANGE_PAYMENT_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_PAYMENT_FAIL"
      });
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_PAYMENT_FAIL")
      );
    });
};

export const getPaymentMethod = () => (dispatch) => {
  axios
    .get("/api/appSetting/PaymentMethodData")
    .then((res) =>
      dispatch({
        type: "GET_PAYMENT_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("show PaymentMethod  Data error! : " + err);
    });
};

//update CustomerType
export const updatePaymentMethod = ({ id, Name }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name
  });

  axios
    .put("/api/appSetting/updatePaymentMethod", body, config)
    .then((res) => {
      dispatch({
        type: "PAYMENT_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getPaymentMethod());
      dispatch({
        type: "CHANGE_PAYMENT_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_PAYMENT_UNSUCCESS"
      });
      toast.error("Payment Method Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PAYMENT_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Region
export const deletePaymentMethod = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/DeletePaymentMethod/${id}`)
    .then((res) => {
      dispatch({
        type: "PAYMENT_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
    });
};

// Register Customer type
export const AddPaymentTerm = ({ Name, duePeriod }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    Name,
    duePeriod
  });

  console.log(Name);

  axios
    .post("/api/appSetting/AddPaymentTerm", body, config)
    .then((res) => {
      dispatch({
        type: "ADD_PAYMENT_TERM_SUCCESS"
      });
      dispatch(getPaymentTerm());
      toast.success("Payment Term Added Successfully!");
      dispatch({
        type: "CHANGE_PAYMENT_TERM_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "ADD_PAYMENT_TERM_FAIL"
      });
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "ADD_PAYMENT_TERM_FAIL"
        )
      );
    });
};

export const getPaymentTerm = () => (dispatch) => {
  axios
    .get("/api/appSetting/PaymentTermData")
    .then((res) =>
      dispatch({
        type: "GET_PAYMENT_TERM_DATA",
        value: res.data
      })
    )
    .catch((err) => {
      console.log("show Payment Term Data error! : " + err);
    });
};

//update CustomerType
export const updatePaymentTerm = ({ id, Name, duePeriod }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({
    id,
    Name,
    duePeriod
  });

  axios
    .put("/api/appSetting/updatePaymentTerm", body, config)
    .then((res) => {
      dispatch({
        type: "PAYMENT_TERM_UPDATED"
      });
      toast.success("Data Updated Successfully!");
      dispatch(getPaymentTerm());
      dispatch({
        type: "CHANGE_PAYMENT_TERM_UPDATE_STATE"
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_PAYMENT_UNSUCCESS"
      });
      toast.error("Payment Term Update Failed!");
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_PAYMENT_TERM_UNSUCCESS"
        )
      );
      console.log(err);
    });
};

//delete Region
export const deletePaymentTerm = (id) => (dispatch) => {
  console.log("id is : " + id);
  axios
    .delete(`/api/appSetting/DeletePaymentTerm/${id}`)
    .then((res) => {
      dispatch({
        type: "PAYMENT_TERM_DELETED",
        value: id
      });
      toast.success("Data Deleted Successfully!");
    })
    .catch((err) => {
      toast.error("Data Delete Failed!");
      console.log("Data Delete error! : " + err);
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
