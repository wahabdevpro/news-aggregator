import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  sources: [],
  keyword: "",
  fromDate: "",
  dateRange: [],
};


const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterData: (state, action) => {

      state.categories = action.payload.categories;
      state.sources = action.payload.sources;
      state.keyword = action.payload.keyword;
      state.dateRange = action.payload.dateRange;

    },
  },
});

export const { setFilterData } = filterSlice.actions;

export default filterSlice.reducer;
