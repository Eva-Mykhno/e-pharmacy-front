import { createSlice } from "@reduxjs/toolkit";
import { fetchPharmacies } from "./operations";

const initialState = {
  pharmacies: [],
  currentPage: 1,
  totalPages: 1,
  perPage: null,
  isLoading: false,
  error: null,
};
const pharmaciesSlice = createSlice({
  name: "pharmacies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPharmaciesPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPharmacies.fulfilled, (state, action) => {
        state.pharmacies = action.payload.pharmacies;
        state.totalPages = action.payload.totalPages || 1;
        state.isLoading = false;
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setCurrentPage, setPharmaciesPerPage } = pharmaciesSlice.actions;

export const pharmaciesReducer = pharmaciesSlice.reducer;
