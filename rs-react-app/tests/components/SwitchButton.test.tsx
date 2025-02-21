import { renderWithProviders } from '../../src/app/shared/utils/test-utils';
import { SwitchButton } from '../../src/app/pages/Main/components/SwitchButton/SwitchButton';

describe('SwitchButton', () => {
  it('should', () => {
    const { getByRole, getByText } = renderWithProviders(<SwitchButton />);
    expect(getByText('Light')).toBeInTheDocument();
    expect(getByText('Dark')).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeInTheDocument();
  });
});
