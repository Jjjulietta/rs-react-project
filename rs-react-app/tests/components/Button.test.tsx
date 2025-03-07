import { render, screen } from '@testing-library/react';
import { Button } from '../../src/components/Button/Button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('should render button name when name is provided', () => {
    render(<Button name="submit" type="submit" className="class" />);
    const button = screen.getByRole('button');
    expect(screen.getByText('submit'));
    expect(button).toBeInTheDocument();
    expect(button).toHaveProperty('type');
  });
});
