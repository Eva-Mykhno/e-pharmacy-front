import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { nearestsReducer } from "./nearest/slice";
import { reviewsReducer } from "./reviews/slice";
import { pharmaciesReducer } from "./pharmacies/slice";
import { productsReducer } from "./products/slice";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["user", "isLoggedIn", "accessToken", "refreshToken"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    nearests: nearestsReducer,
    reviews: reviewsReducer,
    pharmacies: pharmaciesReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
