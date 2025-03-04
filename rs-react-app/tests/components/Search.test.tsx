import { render, screen } from '@testing-library/react';
import { Search } from '../../src/components/Search/Search';
import { userEvent } from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';

describe('Search', () => {
  it('should render Search component', () => {
    const handleSearch = vi.fn();
    render(<Search onSearch={handleSearch} />);

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'submit' });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should call local storage setItem method when button clicked', async () => {
    const handleSearch = vi.fn();
    render(<Search onSearch={handleSearch} />);

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
