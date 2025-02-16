import { configureStore } from '@reduxjs/toolkit';
import { SeasonDetails, Seasons } from '../types/apiTypes';
import cardsReduser from './cardsSlice';
import checkedReduser from './checkedSlice';
import detailsReduser from './detailsSlice';
import { apiSlice } from './apiSlice';

export interface CheckedForPages {
  [key: string]: number[];
}

export type Checked = Pick<Seasons, 'uid' | 'title'>;

export interface SeasonsState {
  seasons: Seasons[];
  page: number;
  checkedItems: string[];
  checkedDetails: SeasonDetails[];
}

export const store = configureStore({
  reducer: {
    seasons: cardsReduser,
    checkedItems: checkedReduser,
    checkedDetails: detailsReduser,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppSore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
