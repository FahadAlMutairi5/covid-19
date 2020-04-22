import { combineReducers } from "redux";
import reportReducers from "./reportReducers"


export default combineReducers({
    reports: reportReducers
  });