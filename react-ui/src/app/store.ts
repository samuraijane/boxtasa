import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/accountsSlice";
import activeDataReducer from "../features/activeDataSlice";
import activeTransactionReducer from "../features/activeTransactionSlice";
import authReducer from "../features/authSlice";
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

// This keeps typescript happy
// https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete
// answer by wasilikoslow as well as commments
export type AppDispatch = typeof store.dispatch;
