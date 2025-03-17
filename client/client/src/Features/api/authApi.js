// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn, userLoggedOut } from "../authSlice";

// const USER_API = "http://localhost:8080/api/v1/user/";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: USER_API,
//     credentials: "include", // Include credentials for cross-origin requests
//   }),
//   endpoints: (builder) => ({
//     registerUser: builder.mutation({
//       query: (inputData) => ({
//         url: "register",
//         method: "POST",
//         body: inputData,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (inputData) => ({
//         url: "login",
//         method: "POST",
//         body: inputData,
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user })); // Save user data to Redux state
//         } catch (error) {
//           console.error("Error during login:", error);
//         }
//       },
//     }),
//     logoutUser: builder.mutation({
//       query: () => ({
//         url: "logout",
//         method: "GET",
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           await queryFulfilled; // Wait for API call to complete
//           dispatch(userLoggedOut()); // Clear user data from Redux state
//         } catch (error) {
//           console.error("Error during logout:", error);
//         }
//       },
//     }),
//     loadUser: builder.query({
//       query: () => ({
//         url: "profile",
//         method: "GET",
//       }),
//       async onQueryStarted(_, { queryFulfilled, dispatch }) {
//         try {
//           const result = await queryFulfilled;
//           dispatch(userLoggedIn({ user: result.data.user })); // Save user profile to Redux state
//         } catch (error) {
//           console.error("Error during loadUser:", error);
//         }
//       },
//     }),
//     uploadUser: builder.mutation({
//       query: (formData) => ({
//         url: "profile/update",
//         method: "PUT",
//         body: formData,
//       }),
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useLogoutUserMutation,
//   useLoadUserQuery,
//   useUploadUserMutation,
// } = authApi;




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn({ user: data.user }));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),

    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch(userLoggedIn({ user: data.user }));
          } else {
            console.error("Unexpected API response:", data);
          }
        } catch (error) {
          console.error("Load user error:", error);
        }
      },
    }),

    uploadUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),

    setNewPassword: builder.mutation({
      query: (passwordData) => ({
        url: "set-password",
        method: "POST",
        body: passwordData,
      }),
    }),

    sendForgotPasswordCodeUser: builder.mutation({
      query: ({ email }) => ({
        url: "send-forgot-password-code",
        method: "POST",
        body: { email: email.trim() },
        headers: { Authorization: null },
      }),
    }),

    verifyForgotPasswordCodeUser: builder.mutation({
      query: (data) => ({
        url: "verify-forgot-password-code",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUploadUserMutation,
  useSetNewPasswordMutation,
  useSendForgotPasswordCodeUserMutation,
  useVerifyForgotPasswordCodeUserMutation,
} = authApi;

