import axios, { AxiosError } from 'axios';
import api from '../../http';
import { AppDispatch } from '..';
import { BrandModel, DeviceModel, TypeModel } from '../../types/types';
import {
  devicesFetching,
  devicesFetchingSuccess,
  devicesFetchingError,
} from './DeviceState';
import {
  typesFetching,
  typesFetchingSuccess,
  typesFetchingError,
} from './TypeState';
import {
  brandsFetching,
  brandsFetchingError,
  brandsFetchingSuccess,
} from './BrandState';

export const fetchDevices =
  (
    limit: number,
    page: number,
    typeId?: string,
    brandId?: string,
    name?: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(devicesFetching());
      const response = await api.get<DeviceModel[]>('/devices', {
        params: { typeId, brandId, limit, page, name },
      });
      dispatch(devicesFetchingSuccess(response.data));
    } catch (e) {
      let message = 'UnknownError';
      if (e instanceof AxiosError) message = e.message;
      dispatch(devicesFetchingError(message));
    }
  };

export const fetchTypes = () => async (dispatch: AppDispatch) => {
  dispatch(typesFetching());
  axios
    .get<TypeModel[]>('http://localhost:5000/types')
    .then((response) => dispatch(typesFetchingSuccess(response.data)))
    .catch((e) => dispatch(typesFetchingError(e.message)));
};

export const fetchBrands = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(brandsFetching());
    const response = await axios.get<BrandModel[]>(
      'http://localhost:5000/brands'
    );
    dispatch(brandsFetchingSuccess(response.data));
  } catch (e) {
    let message = 'UnknownError';
    if (e instanceof AxiosError) message = e.message;
    dispatch(brandsFetchingError(message));
  }
};
