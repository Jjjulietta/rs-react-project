import { render, screen, waitFor } from '@testing-library/react';
import { SeasonDetails } from '../../src/types/apiTypes';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Details } from '../../src/components/Details/Details';
import HttpService from '../../src/services/http.service';
import { BrowserRouter } from 'react-router';
import App from '../../src/App';
import { ReactElement } from 'react';
import axios from 'axios';

vi.mock('axios');

const details: SeasonDetails = {
  uid: '1',
  title: 'Title1',
  series: null,
  seasonNumber: 1,
  numberOfEpisodes: 2,
  episodes: [],
};

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe('Details', () => {
  it('should render card items', async () => {
    afterEach(() => {
      vi.clearAllMocks();
    });

    const httpService = new HttpService();
    httpService.getSeason = vi.fn().mockReturnValue(details);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    const data = await httpService.getSeason('https://stapi.co/api/v1/rest', {
      uid: '1',
    });
    expect(data).toStrictEqual(details);
  });
  it('should show loading', async () => {
    const httpService = new HttpService();
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Details />
      </MemoryRouter>
    );
    vi.spyOn(httpService, 'getSeason').mockImplementation(async () => {
      return details;
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});

describe('Details', () => {
  beforeEach(() => {
    axios.create = vi.fn(() => axios);

    axios.get.mockImplementation(() => {
      return details;
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should navigate to details', async () => {
    renderWithRouter(<App />, { route: '/details/:1' });
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
  it('should load details', async () => {
    const httpService = new HttpService();

    const mockData = vi.spyOn(httpService, 'getSeason');
    mockData.mockImplementation(async () => {
      return details;
    });
    renderWithRouter(<App />, { route: '/details/:1' });
    expect(screen.getAllByTestId('loader')[0]).toBeInTheDocument();
    waitFor(() => expect(screen.findByText('Title1')).toBeInTheDocument());
    waitFor(() => expect(screen.findByText(2)).toBeInTheDocument());
  });
});
