import AuthService from '../../../services/AuthService';
import { AxiosError } from 'axios';
import { AppDispatch } from '../..';
import { authTry, authSuccess, authError, logoutAction } from './UserState';

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authTry());
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(authSuccess(response.data));
    } catch (e) {
      let message = 'UnknownError';
      if (e instanceof Error) message = e.message;
      dispatch(authError(message));
    }
  };

export const registration =
  (nickname: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authTry());
      const response = await AuthService.registration(nickname, password);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(authSuccess(response.data));
    } catch (e) {
      let message = 'UnknownError';
      if (e instanceof Error) message = e.message;
      dispatch(authError(message));
    }
  };

export const authorisation = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authTry());
    const response = await AuthService.refresh();
    localStorage.setItem('token', response.data.accessToken);
    dispatch(authSuccess(response.data));
  } catch (e) {
    let message = 'UnknownError';
    if (e instanceof Error) message = e.message;
    dispatch(authError(message));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  await AuthService.logout();
  localStorage.removeItem('token');
  dispatch(logoutAction());
};
