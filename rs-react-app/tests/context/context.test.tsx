import { ThemeContextProvider } from '../../src/context/themeProvider';
import { renderWithProviders } from '../../src/utils/test-utils';
import { fireEvent, renderHook } from '@testing-library/react';
import { useTheme } from '../../src/context/themeContext';
import { describe, it, expect, vi } from 'vitest';
import { SwitchButton } from 'src/components/SwitchButton/SwitchButton';

const mockOn = vi.fn();
const mockReplase = vi.fn();
vi.mock('next/compat/router', () => ({
  useRouter() {
    return {
      pathname: '',
      query: { uid: '1' },
      push: () => {},
      replase: mockReplase,
      events: {
        on: mockOn,
        off: () => {},
      },
    };
  },
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
