import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page, perPage }, thunkAPI) => {
    try {
      const { data } = await api.get("/products", {
        params: { page, perPage },
      });

      return {
        products: data.data.data,
        totalPages: data.data.totalPages || 1,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Products not found"
      );
    }
  }
);
