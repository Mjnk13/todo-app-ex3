import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authSlide";

export const rootReducer = combineReducers({
  auth: authReducer,
});