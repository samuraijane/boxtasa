import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import transactionsReducer from "../features/transactionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer
  }
});

// This keeps typescript happy
// https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete
// answer by wasilikoslow as well as commments
export type AppDispatch = typeof store.dispatch;
