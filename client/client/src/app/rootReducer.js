import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/authSlice";
import { authApi } from "@/Features/api/authApi";
import { CourseApi } from "@/Features/api/courseApi";
import { purchaseApi } from "@/Features/api/purchaseApi";
import { courseProgressApi } from "@/Features/api/courseProgressApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [CourseApi.reducerPath]: CourseApi.reducer, // Fixed syntax error here
  [purchaseApi.reducerPath]:purchaseApi.reducer,
  [courseProgressApi.reducerPath]:courseProgressApi.reducer,
  
  auth: authReducer,
});

export default rootReducer;
