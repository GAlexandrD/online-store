import axios, { AxiosError } from 'axios';
import api from '../../http';
import { AppDispatch } from '..';
import { pending, success, reject } from './AdminState';
import { DeviceRequest } from '../../types/httpTypes';

export const addDevice =
  (device: DeviceRequest) => async (dispatch: AppDispatch) => {
    try {
      dispatch(pending());
      const response = await api.post<any>('/devices', { ...device, img: '' });
      if (device.img) {
        const formData = new FormData();
        formData.append('img', device.img);
        await api.post(`/devices/upload-img/${response.data.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      dispatch(success(response.data));
    } catch (e) {
      console.log(e);
      let message = 'UnknownError';
      if (e instanceof AxiosError) message = e.response?.data.message;
      dispatch(reject(message));
    }
  };

export const removeDevice = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(pending());
    const response = await api.delete<string>(`/devices/${name}`);
    dispatch(success(response.data));
  } catch (e) {
    let message = 'UnknownError';
    if (e instanceof AxiosError) message = e.response?.data?.message;
    dispatch(reject(message));
  }
};

export const addBrand = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(pending());
    const response = await api.post<string>('/brands', { name });
    dispatch(success(response.data));
  } catch (e) {
    let message = 'UnknownError';
    if (e instanceof AxiosError) message = e.response?.data?.message;
    dispatch(reject(message));
  }
};

export const removeBrand = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(pending());
    const response = await api.delete<string>(`/brands/${name}`);
    dispatch(success(response.data));
  } catch (e) {
    let message = 'UnknownError';
    if (e instanceof AxiosError) message = e.response?.data?.message;
    dispatch(reject(message));
  }
};

export const addType = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(pending());
    const response = await api.post<string>('/types', { name });
    dispatch(success(response.data));
  } catch (e) {
    let message = 'UnknownError';
    if (e instanceof AxiosError) message = e.response?.data?.message;
    dispatch(reject(message));
  }
};

export const removeType = (name: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(pending());
    const response = await api.delete<string>(`/types/${name}`);
    dispatch(success(response.data));
  } catch (e) {
    let message = 'UnknownError';
    if (e instanceof AxiosError) message = e.response?.data?.message;
    dispatch(reject(message));
  }
};
