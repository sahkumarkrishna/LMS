// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "authSlice",
//   initialState,
//   reducers: {
//     userLoggedIn: (state, action) => {
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },
//     userLoggedOut: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { userLoggedIn, userLoggedOut } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  verificationStatus: null, // To track verification status
  passwordChangeStatus: null, // To track password change status
  resetCodeStatus: null, // To track the status of sending reset code
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    verifyForgotPasswordCode: (state, action) => {
      state.verificationStatus = action.payload; // Set verification status
    },
    setNewPassword: (state, action) => {
      state.passwordChangeStatus = action.payload; // Set password change status
    },
    sendForgotPasswordCode: (state, action) => {
      state.resetCodeStatus = action.payload; // Set reset code status instead of password change
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  verifyForgotPasswordCode,
  setNewPassword,
  sendForgotPasswordCode,
} = authSlice.actions;

export default authSlice.reducer;
