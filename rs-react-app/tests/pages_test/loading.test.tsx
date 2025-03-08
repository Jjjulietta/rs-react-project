import Loading from 'src/app/loading';
import { renderWithProviders } from 'src/utils/test-utils';
import { describe, expect, it } from 'vitest';

describe('loading', () => {
  it('should render loading page', () => {
    const { getByTestId } = renderWithProviders(<Loading />);
    expect(getByTestId('loader')).toBeInTheDocument();
  });
});
