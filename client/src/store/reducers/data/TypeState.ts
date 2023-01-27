import { createSlice } from '@reduxjs/toolkit';
import { TypeModel } from '../../../types/types';

interface typeState {
  types: TypeModel[];
  isLoading: boolean;
  error: string | null;
  chosenType: string;
}

const initialState: typeState = {
  types: [],
  isLoading: false,
  error: null,
  chosenType: '',
};

export const typeSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    typesFetching(state) {
      state.isLoading = true;
    },
    typesFetchingSuccess(state, action) {
      state.isLoading = false;
      state.types = action.payload;
      state.error = null;
    },
    typesFetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    chooseType(state, action) {
      state.chosenType = action.payload;
    },
  },
});

export default typeSlice.reducer;
export const {
  typesFetching,
  typesFetchingSuccess,
  typesFetchingError,
  chooseType,
} = typeSlice.actions;
