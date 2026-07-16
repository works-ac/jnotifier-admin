import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userAuthStatus: null,
  userRole: null,
  signupReply: null,
  loginRes: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuthUser: (state) => {
      state.user = null;
    },
    setUserAuthStatus: (state, action) => {
      state.userAuthStatus = action.payload.authStatus;
    },
    clearAuthStatus: (state) => {
      state.userAuthStatus = null;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload.role;
    },
    clearUserRole: (state) => {
      state.userRole = null;
    },
    clearAll: (state) => {
      state.user = null;
      state.userAuthStatus = null;
      state.userRole = null;
      state.signupReply = null;
    },
    setSignupReply: (state, action) => {
      state.signupReply = action.payload;
    },
    clearSignupReply: (state) => {
      state.signupReply = null;
    },
    setLoginRes: (state, action) => {
      state.loginRes = action.payload;
    },
    clearLoginRes: (state) => {
      state.loginRes = null;
    },
  },
});

export const {
  setAuthUser,
  clearAuthUser,
  clearAll,
  clearAuthStatus,
  setUserAuthStatus,
  setUserRole,
  clearUserRole,
  clearSignupReply,
  setSignupReply,
  clearLoginRes,
  setLoginRes,
} = authSlice.actions;
export default authSlice.reducer;
