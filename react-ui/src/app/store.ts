import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/accountsSlice";
import activeDataReducer from "../features/activeDataSlice";
import activeTransactionReducer from "../features/activeTransactionSlice";
import authReducer from "../features/authSlice";
import baseUrlReducer from "../features/baseUrlSlice";
import codeReducer from "../features/codesSlice";
import filteredDataReducer from "../features/filteredDataSlice";
import isModalReducer from "../features/isModalSlice";
import labelsReducer from "../features/labelsSlice";
import monthsReducer from "../features/monthsSlice";
import selectorReducer from "../features/selectorSlice";
import tabsReducer from "../features/tabsSlice";
import taxesReducer from "../features/taxesSlice";
import vendorReducer from "../features/vendorsSlice";
import yearsReducer from "../features/yearsSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    activeData: activeDataReducer,
    activeTransaction: activeTransactionReducer,
    auth: authReducer,
    baseUrl: baseUrlReducer,
    code: codeReducer,
    filteredData: filteredDataReducer,
    isModal: isModalReducer,
    labels: labelsReducer,
    months: monthsReducer,
    selector: selectorReducer,
    tabs: tabsReducer,
    taxes: taxesReducer,
    vendor: vendorReducer,
    years: yearsReducer
  }
});

export type AppDispatch = typeof store.dispatch; // L1

/*

NOTES

[L1]
AppDispatch is the type of the dispatch function from Redux store. It is
used for typing thunks and other async actions that use `dispatch`. See
also the answer by wasilikoslow, as well as comments, at the link below.

// https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete

*/
