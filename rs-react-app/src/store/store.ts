import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedReduser from './checkedSlice';
import detailsReduser from './detailsSlice';
import uidsReduser from './uidSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  checkedItems: checkedReduser,
  checkedDetails: detailsReduser,
  uid: uidsReduser,
  // [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
// export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
