import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const fetchCart = createAsyncThunk("fetchCart", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.accessToken;
  if (!token) {
    return thunkAPI.rejectWithValue("Token not found");
  }
  try {
    const { data } = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", data);
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart"
    );
  }
});

// export const updateCart = createAsyncThunk(
//   "updateCart",
//   async ({ productId, quantity }, thunkAPI) => {
//     const token = thunkAPI.getState().auth.accessToken;
//     if (!token) {
//       return thunkAPI.rejectWithValue("Token not found");
//     }
//     try {
//       const { data } = await api.patch(
//         "/cart/update",
//         { productId, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return data.data.products;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to update cart"
//       );
//     }
//   }
// );

export const updateCart = createAsyncThunk(
  "updateCart",
  async ({ productId, quantity }, thunkAPI) => {
    const token = thunkAPI.getState().auth.accessToken;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }
    try {
      const { data } = await api.patch(
        "/cart/update",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "checkout",
  async ({ shippingInfo, paymentMethod }, thunkAPI) => {
    const token = thunkAPI.getState().auth.accessToken;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }
    try {
      const { data } = await api.post(
        "/cart/checkout",
        { shippingInfo, paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to checkout"
      );
    }
  }
);
