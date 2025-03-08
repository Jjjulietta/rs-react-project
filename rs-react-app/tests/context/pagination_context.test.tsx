import { renderWithProviders } from '../../src/utils/test-utils';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PaginationContextProvider } from 'src/context/paginationProvider';
import { Pagination } from 'src/components/Pagination/Pagination';
import { usePagination } from 'src/context/paginationContext';

vi.mock('next/navigation', () => ({
  usePathname: () => ({ pathname: '' }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => ({ uid: '1' }),
  useSearchParams: () => ({ get: () => {} }),
  useServerInsertedHTML: vi.fn(),
}));

describe('PaginationContext', () => {
  it('should', () => {
    const { getByTestId } = renderWithProviders(
      <PaginationContextProvider>
        <Pagination totalPage={3} />
      </PaginationContextProvider>
    );
    const current = getByTestId('currentPage');
    const { result } = renderHook(() => usePagination());
    expect(result.current.currentPage).toEqual(1);
    expect(current).toHaveTextContent('1');
    expect(result.current.setCurrentPage(2)).toEqual(2);
  });
});
