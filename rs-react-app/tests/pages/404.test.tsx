import NotFoundPage from 'src/pages/404';
import { renderWithProviders } from 'src/utils/test-utils';
import { describe, expect, it } from 'vitest';

describe('404 page', () => {
  it('should', () => {
    const { getByText, getByTestId } = renderWithProviders(<NotFoundPage />);
    expect(getByText('Page not found!')).toBeInTheDocument();
    expect(getByTestId('not_found')).toBeInTheDocument();
  });
});
