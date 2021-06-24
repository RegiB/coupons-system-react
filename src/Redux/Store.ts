import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { companyReducer } from "./CompanyState";
import { couponsReducer } from "./CouponState";
import { customerReducer } from "./CustomerState";

const reducers = combineReducers({
  couponsState: couponsReducer,
  customersState: customerReducer,
  companyState: companyReducer,
  authState: authReducer,
});
const store = createStore(reducers);

export default store;
