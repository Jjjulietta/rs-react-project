import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedReduser from './checkedSlice';
import detailsReduser from './detailsSlice';
import { apiSlice } from './apiSlice';

const rootReducer = combineReducers({
  checkedItems: checkedReduser,
  checkedDetails: detailsReduser,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
