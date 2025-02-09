import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../../src/components/Pagination/Pagination';

describe('Pagination', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Pagination', () => {
    const setPage = vi.fn();
    render(
      <MemoryRouter>
        <Pagination
          setPage={setPage}
          currentPage={1}
          totalPage={3}
        ></Pagination>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument();
  });
  it('should display arrow buttons and number of pages', async () => {
    const setPage = vi.fn();
    render(
      <MemoryRouter>
        <Pagination setPage={setPage} currentPage={1} totalPage={3} />
      </MemoryRouter>
    );
    screen.debug();
    const arrowBtnRight = screen.getByRole('button', { name: '>' });
    const arrowBtnLeft = screen.getByRole('button', { name: '<' });

    expect(arrowBtnRight).toBeInTheDocument();
    expect(arrowBtnLeft).toBeInTheDocument();
    const current = screen.getByTestId('currentPage');
    const totalPage = screen.getByTestId('totalPage');
    expect(current).toBeInTheDocument();
    expect(current).toHaveTextContent('1');
    expect(totalPage).toBeInTheDocument();
    expect(totalPage).toHaveTextContent('3');
    const mockFn = vi.spyOn(console, 'log').mockReturnThis();
    const user = userEvent.setup();
    await user.click(arrowBtnRight);
    expect(mockFn).toHaveBeenCalled();
    waitFor(() => expect(current).toHaveTextContent('2'));
    expect(location.pathname).toEqual('/');
  });
});
