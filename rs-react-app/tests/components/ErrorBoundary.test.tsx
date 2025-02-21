import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/app/shared/components/ErrorBoundary/ErrorBoundary';
import { MemoryRouter } from 'react-router';
import { CardList } from '../../src/app/pages/Main/components/CardList/CardList';

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
    render(
      <MemoryRouter>
        <CardList items={[]} error={'Error'} isLoading={false}></CardList>
      </MemoryRouter>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
