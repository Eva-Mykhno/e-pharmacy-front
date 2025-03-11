import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUser, login, logout, refresh, register } from "./operations";

const initialState = {
  user: null,
  accessToken: null,
  sessionId: null,
  refreshToken: null,
  isLoading: true,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.sessionId = action.payload.sessionId;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.sessionId = action.payload.sessionId;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.sessionId = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          fetchUser.pending,
          logout.pending,
          refresh.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          fetchUser.rejected,
          logout.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
