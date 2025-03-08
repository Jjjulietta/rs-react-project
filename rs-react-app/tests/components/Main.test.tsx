import { Main } from '../../src/components/Main/Main';
import { renderWithProviders } from '../../src/utils/test-utils';
import { describe, it, expect, vi } from 'vitest';

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

describe('Main', () => {
  it('should render switch button', async () => {
    const { getByText, getByRole } = renderWithProviders(<Main />);
    expect(getByText('Light')).toBeInTheDocument();
    expect(getByText('Dark')).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeInTheDocument();
  });
  it('should render Search component', () => {
    const { getByRole } = renderWithProviders(<Main />);

    const input = getByRole('searchbox');
    const button = getByRole('button', { name: 'submit' });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
