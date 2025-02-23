import { render, screen } from '@testing-library/react';
import { Search } from '../../src/app/pages/Main/components/Search/Search';
import { MemoryRouter } from 'react-router';
import { userEvent } from '@testing-library/user-event';

describe('Search', () => {
  it('should render Search component', () => {
    const handleSearch = vi.fn();
    render(
      <MemoryRouter>
        <Search onSearch={handleSearch} />
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'submit' });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should call local storage setItem method when button clicked', async () => {
    const handleSearch = vi.fn();
    render(
      <MemoryRouter>
        <Search onSearch={handleSearch} />
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'submit' });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    const user = userEvent.setup();
    await user.type(input, 'Test');
    expect(input).toHaveValue('Test');
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    mockSetItem.mockImplementation(() => {});
    await user.click(button);
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith('searchValue', 'Test');
  });
});
