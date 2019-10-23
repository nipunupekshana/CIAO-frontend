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
  }
];

export default routes;
