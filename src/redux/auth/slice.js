// import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { fetchUser, login, logout, refresh, register } from "./operations";

// const initialState = {
//   user: null,
//   token: null,
//   isLoading: true,
//   isLoggedIn: false,
//   isRefreshing: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//         state.isLoading = false;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//         state.isLoading = false;
//       })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isLoggedIn = true;
//         state.isLoading = false;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = {
//           name: null,
//           email: null,
//         };
//         state.isLoggedIn = false;
//         state.token = null;
//         state.isLoading = false;
//       })
//       .addCase(refresh.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//         state.isLoading = false;
//         state.isRefreshing = false;
//       })
//       .addMatcher(
//         isAnyOf(
//           register.pending,
//           login.pending,
//           fetchUser.pending,
//           logout.pending,
//           refresh.pending
//         ),
//         (state) => {
//           state.isLoading = true;
//           state.isRefreshing = true;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         isAnyOf(
//           register.rejected,
//           login.rejected,
//           fetchUser.rejected,
//           logout.rejected,
//           refresh.rejected
//         ),
//         (state, action) => {
//           state.isLoading = false;
//           state.isLoggedIn = false;
//           state.isRefreshing = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// export const authReducer = authSlice.reducer;

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
        state.user = action.payload.user ?? null;
        state.isLoggedIn = Boolean(action.payload.user);
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
        state.user = action.payload.user ?? state.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isRefreshing = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.payload;
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
