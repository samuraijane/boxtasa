import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import activeDataReducer from "../features/activeDataSlice";
import codeReducer from "../features/codesSlice";
import filteredDataReducer from "../features/filteredDataSlice";

export const store = configureStore({
  reducer: {
    activeData: activeDataReducer,
    auth: authReducer,
    code: codeReducer,
    filteredData: filteredDataReducer
  }
});

// This keeps typescript happy
// https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete
// answer by wasilikoslow as well as commments
export type AppDispatch = typeof store.dispatch;
