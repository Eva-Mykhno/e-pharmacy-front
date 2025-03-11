import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const fetchUser = createAsyncThunk("user", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.accessToken;

  if (!token) {
    return thunkAPI.rejectWithValue("No access token available");
  }

  setAuthHeader(token);

  try {
    const { data } = await api.get("/user/user-info");
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "User not found");
  }
});

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/user/register", credentials);
      const formattedData = data.data;

      setAuthHeader(formattedData.accessToken);

      return formattedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/user/login", credentials);
      const formattedData = data.data;

      setAuthHeader(formattedData.accessToken);

      return formattedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await api.post("/user/logout");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Logout failed");
  } finally {
    setAuthHeader(null);
  }
});

export const refresh = createAsyncThunk("refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { sessionId, refreshToken } = state.auth;

  if (!refreshToken) {
    return thunkAPI.rejectWithValue("No refresh token available");
  }

  try {
    const { data } = await api.post("/user/refresh", {
      sessionId,
      refreshToken,
    });

    const formattedData = data.data;

    if (!formattedData.accessToken) {
      throw new Error("Invalid refresh response");
    }

    setAuthHeader(formattedData.accessToken);

    return {
      accessToken: formattedData.accessToken,
      refreshToken: formattedData.refreshToken,
      sessionId: formattedData.sessionId ?? sessionId,
      user: formattedData.user,
    };
  } catch (error) {
    if (state.auth.accessToken) {
      setAuthHeader(null);
    }
    return thunkAPI.rejectWithValue(error.response?.data || "Refresh failed");
  }
});
