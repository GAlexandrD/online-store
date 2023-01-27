import { AxiosError } from 'axios';
import api from '../../../http';
import { AppDispatch } from '../..';
import { DeviceModel } from '../../../types/types';
import {
  basketFetching,
  basketFetchingSuccess,
  basketFetchingError,
} from './BasketState';
import { type } from 'os';

export const fetchBasket =
  (userId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(basketFetching());
      const response = await api.get<DeviceModel[]>('/basket', {
        params: { userId },
      });
      dispatch(basketFetchingSuccess(response.data));
    } catch (e) {
      let message = 'UnknownError';
      if (e instanceof AxiosError) message = e.message;
      dispatch(basketFetchingError(message));
    }
  };

export const addToBasket =
  (userId: number, deviceId: number) => async (dispatch: AppDispatch) => {
    await api.post('/basket', { deviceId, userId });
  };

export const deleteFromBasket =
  (userId: number, deviceId: number) => async (dispatch: AppDispatch) => {
    await api.delete('/basket', { params: { userId, deviceId } });
  };
