import { renderWithProviders } from '../../src/utils/test-utils';
import { cardsSeasons } from '../mocksData/mocks';
import { describe, it, expect, vi } from 'vitest';
import { cards } from 'src/mocks/mocks';
import { CardListTemplate } from 'src/components/CardList/CardListTemplate';
import { waitFor } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  __esModule: true,
  usePathname: () => ({ pathname: '' }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({ get: () => {} }),
  useServerInsertedHTML: vi.fn(),
}));

describe('CardList', () => {
  it('should render cards ', async () => {
    const { getByText } = renderWithProviders(
      <CardListTemplate cards={cards} />
    );

    await waitFor(() => expect(getByText('Title1')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Title2')).toBeInTheDocument());
  });

  it('should each card have a link', () => {
    const { getByRole, getAllByRole } = renderWithProviders(
      <CardListTemplate cards={cards} />
    );

    cardsSeasons.forEach((card) => {
      const link = getByRole('button', { name: card.title });
      expect(link).toBeVisible();
    });

    const cardsList = getAllByRole('button');
    expect(cardsList).toHaveLength(5);
  });
});
