import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUser, login, logout, refresh, register } from "./operations";

const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.isLoggedIn = false;
        state.token = null;
        state.isLoading = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
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
          logout.rejected,
          refresh.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isLoggedIn = false;
          state.error = action.payload;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
