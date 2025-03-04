import { render, screen } from '@testing-library/react';
import { NotFound } from '../../src/components/NotFound/NotFound';
import { describe, expect, it } from 'vitest';

describe('NotFound', () => {
  it('should render', () => {
    render(<NotFound />);
    expect(screen.getByTestId('not_found')).toBeInTheDocument();
  });
});
