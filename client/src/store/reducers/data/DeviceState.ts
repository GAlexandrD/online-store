import { createSlice } from '@reduxjs/toolkit';
import { DeviceModel } from '../../../types/types';

interface DeviceState {
  devices: {
    rows: DeviceModel[];
    count: number;
  };
  isLoading: boolean;
  error: string | null;
  chosenDevice: DeviceModel | null;
  search: string;
}

const initialState: DeviceState = {
  devices: {
    rows: [],
    count: 0,
  },
  isLoading: false,
  error: null,
  chosenDevice: null,
  search: '',
};

export const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    devicesFetching(state) {
      state.isLoading = true;
    },
    devicesFetchingSuccess(state, action) {
      state.isLoading = false;
      state.devices = action.payload;
      state.error = null;
    },
    devicesFetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    chooseDevice(state, action) {
      state.chosenDevice = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export default deviceSlice.reducer;
export const {
  devicesFetching,
  devicesFetchingSuccess,
  devicesFetchingError,
  chooseDevice,
  setSearch,
} = deviceSlice.actions;
