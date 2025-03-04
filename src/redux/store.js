import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { nearestsReducer } from "./nearest/slice";
import { reviewsReducer } from "./reviews/slice";
import { pharmaciesReducer } from "./pharmacies/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    nearests: nearestsReducer,
    reviews: reviewsReducer,
    pharmacies: pharmaciesReducer,
  },
});
export default store;
