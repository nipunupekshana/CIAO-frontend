import React, { lazy } from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
///Admin Settings
const Users = lazy(() => import("./views/Users/Users"));
const User = lazy(() => import("./views/Users/User"));
const UserGroup = lazy(() => import("./views/UserGroup/UserGroupReg"));

const Login = lazy(() => import("./views/Login/Login"));
const Register = lazy(() => import("./views/Register/Register"));
const Role = lazy(() => import("./views/Roles/AddRoles"));
const RoleAssignment = lazy(() => import("./views/Roles/RoleAssignment"));
const Program = lazy(() => import("./views/Programme/Program_Reg"));
const Menu = lazy(() => import("./views/Menu/MenuReg"));
const RolePermissionMap = lazy(() =>
  import("./views/Roles/RolePermissionMapping/RolePermissionReg")
);
const UserPermissionReg = lazy(() =>
  import("./views/Users/Permmission/UserPermissionReg")
);
///admin Settings end

///Application Settings
const CategoryReg = lazy(() =>
  import("./views/ApplicationSettings/Category/CategoryReg")
);
const ProductReg = lazy(() =>
  import("./views/ApplicationSettings/Product/productReg")
);
const ShelfLivesReg = lazy(() =>
  import("./views/ApplicationSettings/Shelf Lives/ShelfLivesReg")
);
const DeliveryReg = lazy(() =>
  import("./views/ApplicationSettings/Delivery/DeliveryReg")
);
const itemReg = lazy(() => import("./views/ApplicationSettings/Item/itemReg"));
const OverviewParamter = lazy(() =>
  import("./views/ApplicationSettings/Parameter/OverViewParameterReg")
);

const TaxReg = lazy(() => import("./views/ApplicationSettings/Tax/TaxReg"));
const CountryReg = lazy(() =>
  import("./views/ApplicationSettings/Country/CountryReg")
);

const CurencyReg = lazy(() =>
  import("./views/ApplicationSettings/Currency/CurencyReg")
);

const RegionReg = lazy(() =>
  import("./views/ApplicationSettings/Region/RegionReg")
);

const CustomerTypeReg = lazy(() =>
  import("./views/ApplicationSettings/CustomerType/CustomerTypeReg")
);
const CustomerContactDepartmentReg = lazy(() =>
  import(
    "./views/ApplicationSettings/customerContactDepartment/customerContactDepartmentReg"
  )
);

const invoiceTypeReg = lazy(() =>
  import("./views/ApplicationSettings/invoiceType/invoiceTypeReg")
);

const paymentMethodReg = lazy(() =>
  import("./views/ApplicationSettings/PaymentMethods/paymentMethodReg")
);

const PaymentTermsReg = lazy(() =>
  import("./views/ApplicationSettings/PaymentTerms/PaymentTermsReg")
);

const StakeholderReg = lazy(() =>
  import("./views/StakeHolderMangment/CustomerHandle/StakeholderReg")
);

const StakeholderData = lazy(() =>
  import("./views/StakeHolderMangment/CustomerHandle/StakeholderData")
);

const StakeholderAddress = lazy(() =>
  import("./views/StakeHolderMangment/CustomerHandle/StakeholderAddress")
);

const AddressReg = lazy(() =>
  import("./views/StakeHolderMangment/Address/AddressReg")
);

///Application settings end

//const page404 = lazy(() => import("./views/Pages/Page404/Page404"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",

    component: Dashboard
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    props: { title: "testing123" },
    component: Dashboard
  },
  { path: "/login", name: "Login", component: Login },

  {
    path: "/user_overview",
    name: "Users Overview",
    component: Register
  },
  { path: "/users", exact: true, name: "Users", component: Users },
  {
    path: "/user_group",
    exact: true,
    name: "User Group",
    component: UserGroup
  },
  // { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/userRole", exact: true, name: "User Roles", component: Role },
  {
    path: "/roleAssignment",
    exact: true,
    name: "User Roles Assignment",
    component: RoleAssignment
  },
  { path: "/Program", exact: true, name: "Program Manage", component: Program },
  { path: "/Menu", exact: true, name: "Menu Manage", component: Menu },
  {
    path: "/RolePermissionMap",
    exact: true,
    name: "Role Permission Mapping",
    component: RolePermissionMap
  },
  {
    path: "/UserPermission",
    exact: true,
    name: "User Permission",
    component: UserPermissionReg
  },
  {
    path: "/Category",
    exact: true,
    name: "Category",
    component: CategoryReg
  },
  {
    path: "/Product",
    exact: true,
    name: "Product",
    component: ProductReg
  },
  {
    path: "/ShelfLives",
    exact: true,
    name: "Shelf Lives",
    component: ShelfLivesReg
  },
  {
    path: "/Delivery",
    exact: true,
    name: "Delivery",
    component: DeliveryReg
  },
  {
    path: "/Items",
    exact: true,
    name: "Items",
    component: itemReg
  },
  {
    path: "/OverViewParameter",
    exact: true,
    name: "OverView Parameter",
    component: OverviewParamter
  },
  {
    path: "/TaxData",
    exact: true,
    name: "Taxes",
    component: TaxReg
  },
  {
    path: "/Country_Data",
    exact: true,
    name: "Country_data",
    component: CountryReg
  },
  {
    path: "/Currency",
    exact: true,
    name: "Currency",
    component: CurencyReg
  },
  {
    path: "/Region",
    exact: true,
    name: "Region",
    component: RegionReg
  },
  {
    path: "/Customer_type",
    exact: true,
    name: "Customer type",
    component: CustomerTypeReg
  },
  {
    path: "/Customer_Conatact_department",
    exact: true,
    name: "Customer Conatact Department",
    component: CustomerContactDepartmentReg
  },
  {
    path: "/invoice_Type",
    exact: true,
    name: "Invoice Type",
    component: invoiceTypeReg
  },
  {
    path: "/Payment_method",
    exact: true,
    name: "Payment Method",
    component: paymentMethodReg
  },
  {
    path: "/Payment_Term",
    exact: true,
    name: "Payment Term",
    component: PaymentTermsReg
  },
  {
    path: "/CustomerData/CustomerReg",
    exact: true,
    name: "Customer Reg",
    component: StakeholderReg
  },
  {
    path: "/CustomerData",
    exact: true,
    name: "Customer Data",
    component: StakeholderData
  },
  {
    path: "/CustomerData/CustomerReg/CustomerAddress",
    exact: true,
    name: "Customer Address",
    component: StakeholderAddress
  },
  {
    path: "/Address",
    exact: true,
    name: "Address Mangement",
    component: AddressReg
  }
];

export default routes;
