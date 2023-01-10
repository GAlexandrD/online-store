import { configureStore, combineReducers } from '@reduxjs/toolkit';
import deviceReducer from './reducers/DeviceState';
import brandReducer from './reducers/BrandState';
import typeReducer from './reducers/TypeState';
import userReducer from './reducers/UserState';
import basketReducer from './reducers/BasketState';
import adminReducer from './reducers/AdminState';

const rootReducer = combineReducers({
  deviceReducer,
  typeReducer,
  brandReducer,
  userReducer,
  basketReducer,
  adminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
