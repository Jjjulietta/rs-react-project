import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FieldValues } from 'react-hook-form';

const initialState: FieldValues[] = [];
const hookFormSlice = createSlice({
  name: 'hookForm',
  initialState,
  reducers: {
    addHookFormData(state, action: PayloadAction<FieldValues>) {
      const formData = action.payload;
      state.push(formData);
    },
  },
});

export const { addHookFormData } = hookFormSlice.actions;
export default hookFormSlice.reducer;
export const selectAllHookFormData = (state: RootState) => state.hookFormData;
export const selectHookDataLength = (state: RootState) =>
  state.hookFormData.length;
