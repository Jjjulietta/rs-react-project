import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/components/ErrorBoundary/ErrorBoundary';
import { CardList } from '../../src/components/CardList/CardList';
import { describe, beforeEach, vi, afterEach, it, expect } from 'vitest';

vi.mock('next/compat/router', () => ({
  useRouter() {
    return {
      pathname: '',
      push: () => {},
      query: {},
      events: {
        on: () => {},
        off: () => {},
      },
    };
  },
}));

describe('Error Boundary', () => {
  const TrowError = () => {
    throw new Error('Test');
  };
  const realError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = realError;
  });
  it('Error Boundary', () => {
    render(
      <ErrorBoundary>
        <TrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error: Test')).toBeInTheDocument();
  });

  it('Error Boundary', () => {
    render(<CardList items={[]} error={'Error'} isLoading={false}></CardList>);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
