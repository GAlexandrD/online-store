import { createSlice } from '@reduxjs/toolkit';
import { BrandModel } from '../../../types/types';

interface brandState {
  brands: BrandModel[];
  isLoading: boolean;
  error: string | null;
  chosenBrand: string;
}

const initialState: brandState = {
  brands: [],
  isLoading: false,
  error: null,
  chosenBrand: '',
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    brandsFetching(state) {
      state.isLoading = true;
    },
    brandsFetchingSuccess(state, action) {
      state.isLoading = false;
      state.brands = action.payload;
      state.error = null;
    },
    brandsFetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    chooseBrand(state, action) {
      state.chosenBrand = action.payload;
    },
  },
});

export default brandSlice.reducer;
export const {
  brandsFetching,
  brandsFetchingSuccess,
  brandsFetchingError,
  chooseBrand,
} = brandSlice.actions;
