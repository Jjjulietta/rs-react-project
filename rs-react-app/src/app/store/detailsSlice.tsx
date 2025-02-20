import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeasonDetails } from '../models/types/apiTypes';
import { RootState } from './store';

const initialState: SeasonDetails[] = [];

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    detailsAdded(state, action: PayloadAction<SeasonDetails>) {
      const details = action.payload;
      state.push(details);
    },
    detailsRemoved(state, action: PayloadAction<string>) {
      const uid = action.payload;
      return state.filter((item) => item.uid !== uid);
    },
    removedAllDetails(state, action: PayloadAction<[]>) {
      state = action.payload;
      return state;
    },
  },
});

export const { detailsAdded, detailsRemoved, removedAllDetails } =
  detailsSlice.actions;

export default detailsSlice.reducer;

export const selectAllDetails = (state: RootState) => state.checkedDetails;

export const memoizedSelectorsAllDetails = createSelector(
  [(state: RootState) => state.checkedDetails],
  (checkedDetails) => {
    return checkedDetails;
  }
);
