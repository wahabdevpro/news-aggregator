import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  sources: [],
  isSet: null,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      state.categories = action.payload.categories;
      state.sources = action.payload.sources;
      state.isSet = true;
    },
  },
});

export const { setPreferences } = preferencesSlice.actions;

export default preferencesSlice.reducer;
