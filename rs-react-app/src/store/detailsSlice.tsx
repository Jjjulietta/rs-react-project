import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seasons } from '../models/types/api';
import { RootState } from './store';

const initialState: Seasons[] = [];

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    detailsAdded(state, action: PayloadAction<Seasons>) {
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
export const selectCheckedDetailsLength = (state: RootState) =>
  state.checkedDetails.length;

export const memoizedSelectorsAllDetails = createSelector(
  [(state: RootState) => state.checkedDetails],
  (checkedDetails) => {
    return checkedDetails;
  }
);
