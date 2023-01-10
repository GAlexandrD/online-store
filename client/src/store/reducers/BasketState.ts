import { createSlice } from '@reduxjs/toolkit';
import { DeviceModel } from '../../types/types';

interface BasketState {
  isLoading: boolean;
  error: string | null;
  devices: {
    rows: DeviceModel[];
    count: number;
  };
}

const initialState: BasketState = {
  devices: {
    rows: [],
    count: 0,
  },
  error: null,
  isLoading: false,
};

export const basketSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    basketFetching(state) {
      state.isLoading = true;
    },
    basketFetchingSuccess(state, action) {
      state.isLoading = false;
      state.devices = action.payload;
      state.error = null;
    },
    basketFetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default basketSlice.reducer;
export const { basketFetching, basketFetchingError, basketFetchingSuccess } =
  basketSlice.actions;
