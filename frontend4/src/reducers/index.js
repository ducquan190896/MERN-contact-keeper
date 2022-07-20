import { combineReducers } from "redux";
import userReducer from './userReducer'
import contactReducer from "./contactReducer";

export default combineReducers({
    auth: userReducer,
    Contact: contactReducer
})