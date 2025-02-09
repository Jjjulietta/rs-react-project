import { render, screen } from '@testing-library/react';
import { NotFound } from '../../src/components/NotFound/NotFound';

describe('NotFound', () => {
  it('should render', () => {
    render(<NotFound />);
    expect(screen.getByTestId('not_found')).toBeInTheDocument();
  });
});
