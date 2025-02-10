import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { Main } from '../../src/components/Main/Main';
import HttpService from '../../src/services/http.service';
import { AllSeasonSearch } from '../../src/types/apiTypes';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import App from '../../src/App';

vi.mock('axios');

const cards: AllSeasonSearch = {
  page: {
    pageNumber: 1,
    pageSize: 2,
    numberOfElements: 3,
    totalElements: 3,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
  sort: {
    clauses: [[]],
  },
  seasons: [
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
  ],
};
describe('Main', () => {
  beforeEach(() => {
    const httpService = new HttpService();
    vi.spyOn(httpService, 'getPagination').mockReturnValue(
      new Promise((resolve) => resolve(cards))
    );
    render(<Main />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
      ),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render Main', async () => {
    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument();

    expect(screen.getByText('Star Trek Seasons - Results')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    waitFor(() => screen.debug());
  });
});

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe('Main', () => {
  beforeEach(() => {
    axios.create = vi.fn(() => axios);

    axios.get.mockImplementation(() => {
      return cards;
    });
  });
  it('should load cards', async () => {
    const httpService = new HttpService();
    const mockData = vi.spyOn(httpService, 'getPagination');
    mockData.mockImplementation(async () => {
      return cards;
    });
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    waitFor(async () =>
      expect(await screen.findByText('Title1')).toBeInTheDocument()
    );
  });
});
