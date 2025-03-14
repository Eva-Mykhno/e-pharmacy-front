import { createSelector } from "@reduxjs/toolkit";

const initialCartState = { products: [] };

export const selectCart = (state) => state.carts ?? initialCartState;

export const selectCartProducts = createSelector(
  [selectCart],
  (carts) => carts.products ?? []
);

export const selectCartCount = createSelector(
  [selectCartProducts],
  (products) =>
    (products ?? []).reduce((total, item) => total + item.quantity, 0)
);

export const selectIsLoading = (state) => state.carts.isLoading;
export const selectCartError = (state) => state.carts.error;

export const selectCartTotal = createSelector(
  [selectCartProducts],
  (products) =>
    (products ?? []).reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const selectCartProductQuantity = (productId) => (state) => {
  const item = state.carts.products.find(
    (item) => item.product._id === productId
  );
  return item ? item.quantity : 0;
};
