import { waitFor } from '@testing-library/react';
import { Main } from '../../src/app/pages/Main/Main';
import { renderWithProviders } from '../../src/app/shared/utils/test-utils';

describe('Main', () => {
  it('should render cards', async () => {
    const { getByText, getByTestId } = renderWithProviders(<Main />);
    expect(getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(getByText('Title1')).toBeInTheDocument());
  });
});
