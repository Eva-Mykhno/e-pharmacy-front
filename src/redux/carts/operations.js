import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const fetchCart = createAsyncThunk("fetchCart", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/cart");
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart"
    );
  }
});

export const updateCart = createAsyncThunk(
  "updateCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const { data } = await api.put("/cart/update", {
        productId,
        quantity,
      });
      return data.data;
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
    try {
      const { data } = await api.post("/cart/checkout", {
        shippingInfo,
        paymentMethod,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to checkout"
      );
    }
  }
);
