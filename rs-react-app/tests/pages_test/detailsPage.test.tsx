import { render, screen } from '@testing-library/react';
import DetailsPage from 'src/components/Details/DetailsPage';
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

describe('DetailsPage', () => {
  it('should render details', async () => {
    render(await DetailsPage({ uid: '1' }));
    await screen.findByText('Title1');
    expect(screen.findByText('Title1')).toBeDefined();
    expect(screen.findByText('Paramount+')).toBeDefined();
    await screen.findByText('Paramount+');
  });
});
