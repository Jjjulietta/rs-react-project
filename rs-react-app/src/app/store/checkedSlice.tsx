import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: string[] = [];

const checkedSlise = createSlice({
  name: 'checked',
  initialState,
  reducers: {
    cardAdded(state, action: PayloadAction<string>) {
      const uid = action.payload;
      state.push(uid);
    },
    cardRemoved(state, action: PayloadAction<string>) {
      const uid = action.payload;
      return state.filter((item) => item !== uid);
    },
    removedAll(state, action: PayloadAction<[]>) {
      state = action.payload;
      return state;
    },
  },
});

export const { cardAdded, cardRemoved, removedAll } = checkedSlise.actions;

export default checkedSlise.reducer;

export const selectAllChecked = (state: RootState) => state.checkedItems;
export const selectCheckedNumber = (state: RootState) =>
  state.checkedItems.length;

export const memoizedSelectorsCheckedItemsNumber = createSelector(
  [(state: RootState) => state.checkedItems],
  (checkedItems) => {
    return checkedItems.length;
  }
);

export const memoizedSelectorsCheckedItems = createSelector(
  [(state: RootState) => state.checkedItems],
  (checkedItems) => {
    return checkedItems;
  }
);
