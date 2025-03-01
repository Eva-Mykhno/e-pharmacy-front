import { createSlice } from "@reduxjs/toolkit";
import { fetchNearests } from "./operations";

const initialState = {
  nearests: [],
  isLoading: false,
  error: null,
};

const nearestsSlice = createSlice({
  name: "nearests",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNearests.fulfilled, (state, action) => {
        state.nearests = action.payload.data.data;
        state.isLoading = false;
      })
      .addCase(fetchNearests.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const nearestsReducer = nearestsSlice.reducer;
