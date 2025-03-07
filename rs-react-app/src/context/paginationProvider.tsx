'use client';

import { useState, useMemo } from 'react';
import { PAGINATION_DEFAULT } from 'src/models/constants/constants';
import { defaultContext, PaginationContext } from './paginationContext';

export const PaginationContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [currentPage, setCurrentPage] = useState(PAGINATION_DEFAULT.pageNumber);

  const context = useMemo(
    () => ({ currentPage, setCurrentPage }) as typeof defaultContext,
    [currentPage, setCurrentPage]
  );

  return (
    <PaginationContext.Provider value={context}>
      {props.children}
    </PaginationContext.Provider>
  );
};
