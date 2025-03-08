import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/components/ErrorBoundary/ErrorBoundary';
import { describe, beforeEach, vi, afterEach, it, expect } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => ({ pathname: '' }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => ({ uid: '1' }),
  useSearchParams: () => ({ get: () => {} }),
  useServerInsertedHTML: vi.fn(),
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
});
