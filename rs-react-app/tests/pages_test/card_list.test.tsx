import { screen } from '@testing-library/react';
import CardList from 'src/app/page';
import { renderWithProviders } from 'src/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';

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

describe('page', () => {
  it('should render card list', async () => {
    const searchParams = { search: '', page: '1' };
    renderWithProviders(await CardList({ searchParams }));
    await screen.findByText('Title1');
    expect(screen.findByText('Title1')).toBeDefined();
    await screen.findByText('Title2');
    expect(screen.findByText('Title2')).toBeDefined();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'submit' });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
