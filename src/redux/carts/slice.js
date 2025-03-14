import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, updateCart, checkoutCart } from "./operations";

const initialState = {
  products: [],
  error: null,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.products = [];
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
