import { waitFor } from '@testing-library/react';
import { CardList } from '../../src/components/CardList/CardList';
import { renderWithProviders } from '../../src/utils/test-utils';
import { cardsSeasons, details, seasonApi } from '../mocksData/mocks';
import { describe, it, expect, vi } from 'vitest';
import { Main } from 'src/components/Main/Main';
import { cards } from 'src/mocks/mocks';

const mockOn = vi.fn();
const mockReplase = vi.fn();
vi.mock('next/compat/router', () => ({
  useRouter() {
    return {
      pathname: '',
      push: mockReplase,
      query: {},
      events: {
        on: mockOn,
        off: () => {},
      },
    };
  },
}));

describe('CardList', () => {
  it('should render cards ', async () => {
    const { getByText } = renderWithProviders(
      <Main details={details} cards={cards} detailsPage={seasonApi} />
    );

    await waitFor(() => expect(getByText('Title1')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Title2')).toBeInTheDocument());
  });

  it('should each card have a link', () => {
    const { getByRole, getAllByRole } = renderWithProviders(
      <CardList items={cardsSeasons} error={undefined} isLoading={false} />
    );

    cardsSeasons.forEach((card) => {
      const link = getByRole('button', { name: card.title });
      expect(link).toBeVisible();
    });

    const cardsList = getAllByRole('button');
    expect(cardsList).toHaveLength(2);
  });
});
