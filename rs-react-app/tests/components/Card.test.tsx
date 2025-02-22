import { fireEvent, waitFor } from '@testing-library/react';
import { Card } from '../../src/app/pages/Main/components/Card/Card';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../src/app/shared/utils/test-utils';
import * as hook from '../../src/app/store/detailsSlice';
import * as hooks from '../../src/app/store/checkedSlice';
import { cardSeasons, details } from '../mocksData/mocks';

vi.mock('../../src/store/detailsSlice');
vi.mock('../../src/store/checkedSlic');

describe('Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should', () => {
    const { getByText } = renderWithProviders(<Card item={cardSeasons} />);
    expect(getByText('Title1')).toBeInTheDocument();
    expect(getByText('series1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });

  it('should have link ', async () => {
    const { getByRole } = renderWithProviders(<Card item={cardSeasons} />);
    const link = getByRole('link');
    expect(link).toBeInTheDocument();
  });
  it('should have path for navigate to details', async () => {
    const { getByRole } = renderWithProviders(<Card item={cardSeasons} />);
    userEvent.setup();
    await userEvent.click(getByRole('link'));
    expect(getByRole('link')).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', '/details/:1/');
    await waitFor(() =>
      expect(window.location.pathname).toEqual('/details/:1/')
    );
  });
  it('should navigate to details', async () => {
    const { getByText } = renderWithProviders(<Card item={cardSeasons} />);
    const user = userEvent.setup();
    await user.click(getByText('Title1'));
    await waitFor(() =>
      expect(window.location.pathname).toEqual('/details/:1/')
    );
  });
  it('should have checkbox', async () => {
    const dispatchAdded = vi
      .spyOn(hooks, 'cardAdded')
      .mockReturnValue({ payload: '1', type: 'checked/cardAdded' });
    const detailsMock = vi
      .spyOn(hook, 'selectAllDetails')
      .mockReturnValue([details]);
    vi.spyOn(hooks, 'cardRemoved').mockReturnValue({
      payload: '1',
      type: 'checked/cardRemoved',
    });
    vi.spyOn(hook, 'detailsRemoved').mockReturnValue({
      payload: '1',
      type: 'details/detailsRemoved',
    });
    const { getByRole } = renderWithProviders(<Card item={cardSeasons} />);
    expect(getByRole('checkbox')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    await waitFor(() => {
      expect(getByRole('checkbox')).toBeChecked();
      expect(dispatchAdded).toHaveBeenCalledWith('1');
      expect(detailsMock).toHaveBeenCalled();
    });
    fireEvent.click(getByRole('checkbox'));
    await waitFor(() => {
      expect(getByRole('checkbox')).not.toBeChecked();
      expect(hooks.cardRemoved).toHaveBeenCalledWith('1');
      expect(hook.detailsRemoved).toHaveBeenCalledWith('1');
    });
  });
});
