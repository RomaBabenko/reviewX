import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    resetFilter(state) {
      state.searchValue = "";
    },
    filterProducts(state, action) {
    },
  },
});

export const selectSearchFilter = (state) => state.searchFilter;

export const { setSearchValue, resetFilter, filterProducts } = searchFilterSlice.actions;

export default searchFilterSlice.reducer;
