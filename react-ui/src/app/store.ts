import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/accountsSlice";
import activeTransactionReducer from "../features/activeTransactionSlice";
import authReducer from "../features/authSlice";
import activeDataReducer from "../features/activeDataSlice";
import codeReducer from "../features/codesSlice";
import filteredDataReducer from "../features/filteredDataSlice";
import isModalReducer from "../features/isModalSlice";
import vendorReducer from "../features/vendorsSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    activeData: activeDataReducer,
    activeTransaction: activeTransactionReducer,
    auth: authReducer,
    code: codeReducer,
    filteredData: filteredDataReducer,
    isModal: isModalReducer,
    vendor: vendorReducer
  }
});

// This keeps typescript happy
// https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete
// answer by wasilikoslow as well as commments
export type AppDispatch = typeof store.dispatch;
