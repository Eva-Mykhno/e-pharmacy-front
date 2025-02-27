// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../api/api.js";

// const setAuthHeader = (token = null) => {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

// export const fetchUser = createAsyncThunk("user", async (_, thunkAPI) => {
//   try {
//     const { data } = await api.get("/user/user-info");
//     return data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data || "User not found");
//   }
// });

// export const register = createAsyncThunk(
//   "register",
//   async (credentials, thunkAPI) => {
//     try {
//       const { data } = await api.post("/user/register", credentials);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Registration failed"
//       );
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "login",
//   async (credentials, thunkAPI) => {
//     try {
//       const { data } = await api.post("/user/login", credentials);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
//     }
//   }
// );

// export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
//   try {
//     await api.post("/user/logout");
//     setAuthHeader(null);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data || "Logout failed");
//   }
// });

// // export const refresh = createAsyncThunk("refresh", async (_, thunkAPI) => {
// //   try {
// //     const state = thunkAPI.getState();
// //     const token = state.auth.token;
// //     if (!token) {
// //       return thunkAPI.rejectWithValue("No token available");
// //     }

// //     setAuthHeader(token);
// //     const { data } = await api.get("/user/refresh");
// //     if (!data.token) {
// //       throw new Error("No token received");
// //     }

// //     setAuthHeader(data.token);
// //     return data;
// //   } catch (error) {
// //     return thunkAPI.rejectWithValue(error.response?.data || "Refresh failed");
// //   }
// // });

// export const refresh = createAsyncThunk("refresh", async (_, thunkAPI) => {
//   const token = thunkAPI.getState().auth.token;

//   if (!token) {
//     return thunkAPI.rejectWithValue("No token available");
//   }

//   try {
//     setAuthHeader(token);
//     const { data } = await api.get("/user/refresh");

//     if (!data.token || !data.user) {
//       throw new Error("Invalid refresh response");
//     }

//     setAuthHeader(data.token);
//     return { user: data.user, token: data.token };
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data || "Refresh failed");
//   }
// });

import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

const setAuthHeader = (token = null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const fetchUser = createAsyncThunk("user", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/user/user-info");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "User not found");
  }
});

export const register = createAsyncThunk(
  "register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/user/register", credentials);
      setAuthHeader(data.accessToken);
      return data;
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
      setAuthHeader(data.accessToken);
      return data;
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

  if (!sessionId || !refreshToken) {
    return thunkAPI.rejectWithValue("No refresh token available");
  }

  try {
    const { data } = await api.post("/user/refresh", {
      sessionId,
      refreshToken,
    });

    if (!data.accessToken) {
      throw new Error("Invalid refresh response");
    }

    setAuthHeader(data.accessToken);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      sessionId,
      user: data.user,
    };
  } catch (error) {
    if (state.auth.accessToken) {
      setAuthHeader(null);
    }
    return thunkAPI.rejectWithValue(error.response?.data || "Refresh failed");
  }
});
