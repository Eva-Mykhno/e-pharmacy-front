import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products.products;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectPerPage = (state) => state.products.perPage;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectFilters = (state) => state.products.filters;
export const selectProduct = (state) => state.products.product;

export const selectProductById = createSelector(
  [selectProduct],
  (product) => product || {}
);
