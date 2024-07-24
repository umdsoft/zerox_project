import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers';

export const Store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});
