import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { useDispatch, useSelector } from 'react-redux';

export const createAppAsynkThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispath: AppDispatch;
}>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
