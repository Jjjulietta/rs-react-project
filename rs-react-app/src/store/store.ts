import { combineReducers, configureStore } from '@reduxjs/toolkit';
import checkedReduser from './checkedSlice';
import detailsReduser from './detailsSlice';
import uidsReduser from './uidSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  checkedItems: checkedReduser,
  checkedDetails: detailsReduser,
  uid: uidsReduser,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
