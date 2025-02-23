import { waitFor } from '@testing-library/react';
import { CardList } from '../../src/app/pages/Main/components/CardList/CardList';
import { renderWithProviders } from '../../src/app/shared/utils/test-utils';
import { Main } from '../../src/app/pages/Main/Main';
import { cardsSeasons } from '../mocksData/mocks';

describe('CardList', () => {
  it('should render cards ', async () => {
    const { getByText, getByTestId } = renderWithProviders(<Main />);
    expect(getByTestId('loader')).toBeInTheDocument();
    await waitFor(() => expect(getByText('Title1')).toBeInTheDocument());
    await waitFor(() => expect(getByText('Title2')).toBeInTheDocument());
  });

  it('should each card have a link', () => {
    const { getByRole, getAllByRole } = renderWithProviders(
      <CardList items={cardsSeasons} error={undefined} isLoading={false} />
    );

    cardsSeasons.forEach((card) => {
      const link = getByRole('link', { name: card.title });
      expect(link).toBeVisible();
    });

    const cardsList = getAllByRole('link');
    expect(cardsList).toHaveLength(2);
  });
});
