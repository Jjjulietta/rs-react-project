'use client';
import { createContext, useContext } from 'react';
import { PAGINATION_DEFAULT } from '../models/constants/constants';

export const defaultContext = {
  currentPage: PAGINATION_DEFAULT.pageNumber,
  setCurrentPage: (page: number) => {
    return page;
  },
};

export const PaginationContext = createContext(defaultContext);
export const usePagination = () => {
  return useContext(PaginationContext);
};
