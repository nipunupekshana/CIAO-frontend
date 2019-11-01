import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import pageReducer from "./pageReducer";
import tableReducer from "./tableReducer";
import AuthApplicationSettingReducer from "./AuthApplicationSettingReducer";
import StakeholderReducer from "./StakeholderReducer";

export default combineReducers({
  item: itemReducer,
  auth: authReducer,
  error: errorReducer,
  page: pageReducer,
  table: tableReducer,
  AppSetting: AuthApplicationSettingReducer,
  StakeHolderSetting: StakeholderReducer
});
