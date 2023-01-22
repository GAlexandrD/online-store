import { createSlice } from '@reduxjs/toolkit';

interface AdminState {
  pending: boolean;
  error: null | string;
  payload: string;
}

const initialState: AdminState = {
  pending: false,
  error: null,
  payload: '',  
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    pending(state) {
      state.pending = true;
    },
    success(state, action) {
      state.payload = action.payload;
      state.error = null;
      state.pending = false;
    },
    reject(state, action) {
      state.error = action.payload;
      state.payload = '';
      state.pending = false;
    },
    removeError(state) {
      state.error = null;
    },
    removePayload(state) {
      state.payload = '';
    }
  },
});

export default adminSlice.reducer;
export const { pending, success, reject, removeError, removePayload } = adminSlice.actions;
