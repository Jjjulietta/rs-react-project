import NotFoundPage from 'src/app/not-found';
import { renderWithProviders } from 'src/utils/test-utils';
import { describe, expect, it } from 'vitest';

describe('not-foun page', () => {
  it('should render not-found page', () => {
    const { getByText, getByTestId, getByRole } = renderWithProviders(
      <NotFoundPage />
    );
    expect(getByTestId('not_found')).toBeInTheDocument();
    expect(getByText('Return Home')).toBeInTheDocument();
    expect(getByRole('link')).toBeInTheDocument();
  });
});
