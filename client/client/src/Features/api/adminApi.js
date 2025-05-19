import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminLoggedIn, adminLoggedOut } from "../adminSlice";

const ADMIN_API = "http://localhost:8080/api/v1/admin/";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ADMIN_API,
    credentials: "include", // Include credentials for cross-origin requests
  }),
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (inputData) => ({
        url: "admin-register",
        method: "POST",
        body: inputData,
      }),
    }),

    loginAdmin: builder.mutation({
      query: (inputData) => ({
        url: "admin-login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("Admin Login Response:", result.data);

          if (result.data && result.data.admin) {
            dispatch(adminLoggedIn(result.data.admin)); // ✅ Ensure correct structure
          } else {
            console.error("Unexpected response format:", result.data);
          }
        } catch (error) {
          console.error("Error during admin login:", error);
        }
      },
    }),

    logoutAdmin: builder.mutation({
      query: () => ({
        url: "admin-logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(adminLoggedOut()); // ✅ Clears admin state
        } catch (error) {
          console.error("Error during admin logout:", error);
        }
      },
    }),

    loadAdmin: builder.query({
      query: () => ({
        url: "admin-profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("Load Admin Response:", result.data);

          if (result.data && result.data.admin) {
            dispatch(adminLoggedIn(result.data.admin)); // ✅ Ensure correct structure
          } else {
            console.error("Unexpected response format:", result.data);
          }
        } catch (error) {
          console.error("Error during loadAdmin:", error);
        }
      },
    }),

    updateAdminProfile: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useLoadAdminQuery,
  useUpdateAdminProfileMutation,
  useGetAllUsersQuery,
} = adminApi;
