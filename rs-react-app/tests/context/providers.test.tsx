import { renderWithProviders } from '../../src/utils/test-utils';
import { fireEvent, renderHook } from '@testing-library/react';
import { useTheme } from '../../src/context/themeContext';
import { describe, it, expect, vi } from 'vitest';
import { SwitchButton } from 'src/components/SwitchButton/SwitchButton';
import Providers from 'src/context/providers';

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

describe('providers', () => {
  it('should', () => {
    const { getByRole } = renderWithProviders(
      <Providers>
        <SwitchButton />
      </Providers>
    );
    const input = getByRole('checkbox');
    const { result } = renderHook(() => useTheme());
    expect(input).not.toBeChecked();
    expect(result.current.theme).toEqual('light');
    fireEvent.change(input, { target: { checked: true } });
    expect(result.current.setTheme('dark')).toEqual('dark');
  });
});
