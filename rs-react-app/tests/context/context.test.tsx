import { ThemeContextProvider } from '../../src/context/themeProvider';
import { renderWithProviders } from '../../src/utils/test-utils';
import { fireEvent, renderHook } from '@testing-library/react';
import { useTheme } from '../../src/context/themeContext';
import { describe, it, expect, vi } from 'vitest';
import { SwitchButton } from 'src/components/SwitchButton/SwitchButton';

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

describe('Context', () => {
  it('should', () => {
    const { getByRole } = renderWithProviders(
      <ThemeContextProvider>
        <SwitchButton />
      </ThemeContextProvider>
    );
    const input = getByRole('checkbox');
    const { result } = renderHook(() => useTheme());
    expect(input).not.toBeChecked();
    expect(result.current.theme).toEqual('light');
    fireEvent.change(input, { target: { checked: true } });
    expect(result.current.setTheme('dark')).toEqual('dark');
  });
});
