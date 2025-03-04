import { screen } from '@testing-library/react';
import { Main } from 'src/components/Main/Main';
import { cards } from 'src/mocks/mocks';
import Index from 'src/pages';
import { renderWithProviders } from 'src/utils/test-utils';
import { details, seasonApi } from 'tests/mocksData/mocks';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/compat/router', () => ({
  useRouter() {
    return {
      pathname: '',
      push: vi.fn(),
      replace: () => {},
      query: { search: '', page: '1', checked: '' },
      events: {
        on: vi.fn(),
        off: () => {},
      },
    };
  },
}));

describe('index', () => {
  it('should', () => {
    renderWithProviders(
      <Main details={details} cards={cards} detailsPage={undefined} />
    );
    expect(screen.getByText('Title1')).toBeInTheDocument();
  });
  it('should', () => {
    renderWithProviders(
      <Index details={details} cards={cards} detailsPage={undefined} />
    );
    expect(screen.getByText('Title1')).toBeInTheDocument();
  });
  it('should', () => {
    vi.mock('next/compat/router', () => ({
      useRouter() {
        return {
          pathname: '',
          push: vi.fn(),
          replace: () => {},
          query: { search: '', page: '1', checked: '', uid: '1' },
          events: {
            on: vi.fn(),
            off: () => {},
          },
        };
      },
    }));
    const { getByRole, getByText } = renderWithProviders(
      <Index details={details} cards={cards} detailsPage={seasonApi} />
    );
    expect(getByText('Paramount+')).toBeInTheDocument();
    expect(getByText('CBS Studios')).toBeInTheDocument();
    expect(getByRole('button', { name: 'close details' })).toBeInTheDocument();
  });
});
