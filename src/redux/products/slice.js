import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./operations";

const initialState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  perPage: null,
  isLoading: false,
  error: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages || 1;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.error("Fetch error:", action.payload);
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setCurrentPage, setProductsPerPage } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
