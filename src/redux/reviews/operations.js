import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api.js";

export const fetchReviews = createAsyncThunk("reviews", async (_, thunkAPI) => {
  try {
    const { data } = await api.get("/customer-reviews");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || "Reviews not found"
    );
  }
});
