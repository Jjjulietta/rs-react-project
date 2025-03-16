import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import formReducer from './formSlice';
import hookFormReducer from './hookFormSlice';
import indexReducer from './indexSlice';
import { countryApi } from './countryApi';

const rootReducer = combineReducers({
  formData: formReducer,
  hookFormData: hookFormReducer,
  index: indexReducer,
  [countryApi.reducerPath]: countryApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(countryApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
