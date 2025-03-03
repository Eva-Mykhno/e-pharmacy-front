import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const fetchNearests = createAsyncThunk(
  "nearests",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/stores/nearest");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Nearests pharmacies not found"
      );
    }
  }
);
