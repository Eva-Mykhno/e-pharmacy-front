import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, updateCart, checkoutCart } from "./operations";

const initialState = {
  products: [],
  status: "idle",
  error: null,
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
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      // .addCase(updateCart.fulfilled, (state, action) => {
      //   state.status = "succeeded";

      //   action.payload.forEach((updatedProduct) => {
      //     const existingProduct = state.products.find(
      //       (item) => item.product._id === updatedProduct.product._id
      //     );
      //     if (existingProduct) {
      //       existingProduct.quantity = updatedProduct.quantity;
      //     } else {
      //       state.products.push(updatedProduct);
      //     }
      //   });
      // })

      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.products = [];
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
