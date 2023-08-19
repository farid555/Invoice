import { configureStore } from '@reduxjs/toolkit';
import { baseApiSlice } from '../features/api/baseApiSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authReducer,
  },

  middlware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middlware),
  //TODO: change this to false in production
  devTools: true,
});
