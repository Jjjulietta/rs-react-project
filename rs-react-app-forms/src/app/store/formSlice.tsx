import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { FieldValues } from 'react-hook-form';

const initialState: FieldValues[] = [];
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData(state, action: PayloadAction<FieldValues>) {
      const formData = action.payload;
      state.push(formData);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
export const selectAllData = (state: RootState) => state.formData;
export const selectDataLength = (state: RootState) => state.formData.length;
