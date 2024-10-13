// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import alertReducer from "./slices/alertSlice";
import authReducer from "./slices/authSlice";
import preferences from "./slices/preferencesSlice";
import siteData from "./slices/siteDataSlice";
import filterSlice from "./slices/filterSlice";

// Add other slices as needed

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    alert: alertReducer,
    auth: authReducer,
    preferences,
    siteData,
    filter: filterSlice
  },
});

export default store;
