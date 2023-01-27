import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isAuth: boolean;
  id: number | null;
  email: string | null;
  role: string;
  isPanding: boolean;
  error: null | string;
}

const initialState: UserState = {
  isAuth: false,
  id: null,
  role: '',
  email: null,
  isPanding: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    authTry(state) {
      state.isPanding = true;
    },
    authSuccess(state, action) {
      state.isPanding = false;
      state.isAuth = true;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.id = action.payload.user.id;
    },
    authError(state, action) {
      state.isPanding = false;
      state.error = action.payload;
    },
    logoutAction(state) {
      state.isAuth = false;
      state.email = null;
      state.id = null;
      state.error = null;
      state.role = '';
    },
  },
});

export default userSlice.reducer;
export const { authTry, authSuccess, authError, logoutAction } =
  userSlice.actions;
