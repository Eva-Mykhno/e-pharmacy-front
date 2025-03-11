export const selectCartProducts = (state) => state.cart.products;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;
export const selectCartTotal = (state) =>
  state.cart.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
