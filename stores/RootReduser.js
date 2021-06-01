import { combineReducers } from "redux";
import marketReduser from "./market/marketReducer";
import tabReduser from "./tab/tabReducers";

export default combineReducers({
	tabReduser,
	marketReduser,
});
