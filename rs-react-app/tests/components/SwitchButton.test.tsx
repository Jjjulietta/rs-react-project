import { renderWithProviders } from '../../src/utils/test-utils';
import { SwitchButton } from '../../src/components/SwitchButton/SwitchButton';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  __esModule: true,
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

describe('SwitchButton', () => {
  it('should', () => {
    const { getByRole, getByText } = renderWithProviders(<SwitchButton />);
    expect(getByText('Light')).toBeInTheDocument();
    expect(getByText('Dark')).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeInTheDocument();
  });
});
