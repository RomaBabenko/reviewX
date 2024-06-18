// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import searchFilterReducer from "./slices/searchFilterSlice"; 

const store = configureStore({
  reducer: {
    searchFilter: searchFilterReducer,
  },
});

export default store;
