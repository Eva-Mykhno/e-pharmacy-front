export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUserName = (state) => state.auth.user?.name || "";
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
