import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Index {
  formIndex: number | undefined;
  hookIndex: number | undefined;
}

const initialState: Index = {
  formIndex: undefined,
  hookIndex: undefined,
};

const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    addIndex(state, action: PayloadAction<Index>) {
      state = action.payload;
      return state;
    },
    removeIndex(state, action: PayloadAction<Index>) {
      state = action.payload;
      return state;
    },
  },
});

export const { addIndex, removeIndex } = indexSlice.actions;
export default indexSlice.reducer;
export const selectIndex = (state: RootState) => state.index;
