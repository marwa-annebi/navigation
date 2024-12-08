import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  pushNotifToken: null, // To store the push notification token
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Start login process
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Handle successful login
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Handle failed login
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Logout the user
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.pushNotifToken = null; // Clear push notification token
    },
    // Set authentication data from AsyncStorage
    setAuthFromStorage: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Save push notification token
    setPushNotifToken: (state, action) => {
      state.pushNotifToken = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setAuthFromStorage,
  setPushNotifToken,
} = authSlice.actions;

export default authSlice.reducer;
