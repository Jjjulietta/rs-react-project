import { render, screen, waitFor } from '@testing-library/react';
import { Seasons } from '../../src/types/apiTypes';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { Card } from '../../src/components/Card/Card';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

const card: Seasons = {
  numberOfEpisodes: 2,
  title: 'Title1',
  uid: 1,
  seasonNumber: 1,
  series: {
    title: 'series1',
    uid: 1,
  },
};

describe('CardList', () => {
  it('should render card', () => {
    render(
      <MemoryRouter>
        <Card item={card} />
      </MemoryRouter>
    );
    const title = screen.getByText('Title1');
    expect(title).toBeInTheDocument();
    expect(screen.getByText('series1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
  it('should have link ', async () => {
    render(
      <MemoryRouter>
        <Card item={card} />
      </MemoryRouter>
    );
    const link = screen.getByRole('link');
    const user = userEvent.setup();
    expect(link).toBeInTheDocument();
    await user.click(screen.getByText('Title1'));
    waitFor(() => expect(link).toHaveBeenCalledOnce());
  });
});

describe('page', () => {
  it('should have path for navigate to details', async () => {
    const { getByRole } = render(<Card item={card} />, {
      wrapper: BrowserRouter,
    });
    userEvent.setup();
    await userEvent.click(getByRole('link'));
    expect(getByRole('link')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', '/details/:1/');
    await waitFor(() =>
      expect(window.location.pathname).toEqual('/details/:1/')
    );
  });
});

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe('page', () => {
  it('should navigate to details', async () => {
    const { user } = renderWithRouter(<Card item={card} />);
    await user.click(screen.getByText('Title1'));
    await waitFor(() =>
      expect(window.location.pathname).toEqual('/details/:1/')
    );
  });
});
