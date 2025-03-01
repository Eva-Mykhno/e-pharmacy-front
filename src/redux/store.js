import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { nearestsReducer } from "./nearest/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    nearests: nearestsReducer,
  },
});
export default store;
