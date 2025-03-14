import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchPharmacies = createAsyncThunk(
  "fetchAll",
  async ({ page, perPage }, thunkAPI) => {
    try {
      const { data } = await api.get("/stores", { params: { page, perPage } });

      return {
        pharmacies: data.data.data,
        totalPages: data.data.totalPages || 1,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Pharmacies not found"
      );
    }
  }
);
