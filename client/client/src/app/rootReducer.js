import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";
import { authApi } from "@/Features/api/authApi";
import { CourseApi } from "@/Features/api/courseApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [CourseApi.reducerPath]: CourseApi.reducer, // Fixed syntax error here
  auth: authReducer,
});

export default rootReducer;
