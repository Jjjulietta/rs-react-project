import { waitFor } from '@testing-library/react';
import { Details } from '../../src/app/pages/Details/Details';
import { renderWithProviders } from '../../src/app/shared/utils/test-utils';

describe('Details', () => {
  it('should show loading', async () => {
    const { getByTestId } = renderWithProviders(<Details />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });
  it('should render card items', async () => {
    const { getByText } = renderWithProviders(<Details />);
    await waitFor(() => expect(getByText('Title1')).toBeInTheDocument());
  });
  it('should have button', async () => {
    const { getByRole } = renderWithProviders(<Details />);
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button')).toHaveTextContent('close details');
  });
});
