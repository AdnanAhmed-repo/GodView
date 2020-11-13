import { combineReducers } from 'redux';

import adminReducer from "./adminReducer";
import dashboardReducer from "./dashboardReducer";
import companyReducer from "./companyReducer";
 
export default combineReducers({
   admin: adminReducer,
   dashboard: dashboardReducer,
   company: companyReducer
  });

