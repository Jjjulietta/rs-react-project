import { ThemeContextProvider } from '../../src/context/themeProvider';
import { renderWithProviders } from '../../src/app/shared/utils/test-utils';
import App from '../../src/App';
import { fireEvent, renderHook } from '@testing-library/react';
import { useTheme } from '../../src/context/themeContext';

describe('Context', () => {
  it('should', () => {
    const { getByRole } = renderWithProviders(
      <ThemeContextProvider>
        <App />
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
