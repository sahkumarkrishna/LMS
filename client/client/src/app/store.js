import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/Features/api/authApi";
import { CourseApi } from "@/Features/api/courseApi";
import { purchaseApi } from "@/Features/api/purchaseApi";

// Configure the Redux store
export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      CourseApi.middleware,
      purchaseApi.middleware
    ),
});

// Initialize the app by dispatching the loadUser endpoint
const initializeApp = async () => {
  try {
    await appStore.dispatch(
      authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
    console.log("User data loaded successfully.");
  } catch (error) {
    console.error("Failed to load user data:", error);
  }
};
initializeApp();
