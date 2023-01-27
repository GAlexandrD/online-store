import { configureStore, combineReducers } from '@reduxjs/toolkit';
import deviceReducer from './reducers/data/DeviceState';
import brandReducer from './reducers/data/BrandState';
import typeReducer from './reducers/data/TypeState';
import userReducer from './reducers/user/UserState';
import basketReducer from './reducers/user/BasketState';
import adminReducer from './reducers/admin/AdminState';

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
