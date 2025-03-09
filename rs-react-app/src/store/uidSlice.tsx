import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: string = '';

const uidsSlice = createSlice({
  name: 'uid',
  initialState,
  reducers: {
    uidChecked(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
    uidCheckedRemoved(state, action: PayloadAction<''>) {
      state = action.payload;
      return state;
    },
  },
});

export const { uidChecked, uidCheckedRemoved } = uidsSlice.actions;

export default uidsSlice.reducer;

export const selectUId = (state: RootState) => state.uid;
