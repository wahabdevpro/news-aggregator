import { createSlice } from '@reduxjs/toolkit';

// Initial state for the alert
const initialState = {
  message: 'Something went wrong',
  severity: 'info', // Can be 'success', 'error', 'warning', 'info'
  open: false,
  duration: 3000,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity || 'info';
      state.open = true;
      state.duration = action.payload.duration || 3000;
    },
    closeAlert: (state) => {
      state.open = false;
    },
  },
});

// Exporting actions
export const { showAlert, closeAlert } = alertSlice.actions;

// Exporting reducer
export default alertSlice.reducer;
