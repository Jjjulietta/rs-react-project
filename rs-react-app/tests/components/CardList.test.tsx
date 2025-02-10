import { render, screen } from '@testing-library/react';
import { CardList } from '../../src/components/CardList/CardList';
import { Seasons } from '../../src/types/apiTypes';
import { MemoryRouter } from 'react-router';

describe('CardList', () => {
  it('should render no cards when the cards array is empty', () => {
    render(
      <MemoryRouter>
        <CardList items={[]} error="" isLoading={false} />
      </MemoryRouter>
    );
  });
  it('should render a list of cards', () => {
    const cards: Seasons[] = [
      {
        numberOfEpisodes: 2,
        title: 'Title1',
        uid: 1,
        seasonNumber: 1,
        series: {
          title: 'series1',
          uid: 1,
        },
      },
      {
        numberOfEpisodes: 4,
        title: 'Title2',
        uid: 2,
        seasonNumber: 2,
        series: {
          title: 'series2',
          uid: 2,
        },
      },
      {
        numberOfEpisodes: 6,
        title: 'Title3',
        uid: 3,
        seasonNumber: 3,
        series: {
          title: 'series3',
          uid: 3,
        },
      },
    ];
    render(
      <MemoryRouter>
        <CardList items={cards} error={undefined} isLoading={false} />
      </MemoryRouter>
    );

    cards.forEach((card) => {
      const link = screen.getByRole('link', { name: card.title });
      expect(link).toBeVisible();
    });

    const cardsList = screen.getAllByRole('link');
    expect(cardsList).toHaveLength(3);
  });
});
