import { renderWithProviders } from '../../src/utils/test-utils';
import { SwitchButton } from '../../src/components/SwitchButton/SwitchButton';
import { describe, it, expect, vi } from 'vitest';

const mockOn = vi.fn();
const mockReplase = vi.fn();
vi.mock('next/compat/router', () => ({
  useRouter() {
    return {
      pathname: '',
      replase: mockReplase,
      query: {},
      events: {
        on: mockOn,
        off: () => {},
      },
    };
  },
}));

describe('SwitchButton', () => {
  it('should', () => {
    const { getByRole, getByText } = renderWithProviders(<SwitchButton />);
    expect(getByText('Light')).toBeInTheDocument();
    expect(getByText('Dark')).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeInTheDocument();
  });
});
