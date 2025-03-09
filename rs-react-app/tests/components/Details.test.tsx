import { waitFor } from '@testing-library/react';
import { Details } from '../../src/components/Details/Details';
import { renderWithProviders } from '../../src/utils/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { seasonApi } from 'tests/mocksData/mocks';

vi.mock('next/navigation', () => ({
  __esModule: true,
  usePathname: () => ({ pathname: '' }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({ get: () => {} }),
  useServerInsertedHTML: vi.fn(),
}));

describe('Details', () => {
  it('should render card items', async () => {
    const { getByText } = renderWithProviders(<Details details={seasonApi} />);
    await waitFor(() => expect(getByText('Title1')).toBeInTheDocument());
  });
  it('should have button', async () => {
    const { getByRole } = renderWithProviders(<Details details={seasonApi} />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('close details');
  });
});
