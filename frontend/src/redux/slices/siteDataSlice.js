import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: {},
  sources: {},
  isSet: null,
};


const siteDataSlice = createSlice({
  name: 'siteData',
  initialState,
  reducers: {
    setSiteData: (state, action) => {
      state.categories = action.payload.categories;
      state.sources = action.payload.sources;
      state.isSet = true;
    },
  },
});

export const { setSiteData } = siteDataSlice.actions;

export default siteDataSlice.reducer;
