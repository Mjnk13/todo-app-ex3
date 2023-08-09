import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userSlide";

export const rootReducer = combineReducers({
  user: userReducer,
});