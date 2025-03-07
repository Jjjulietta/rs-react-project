import { fireEvent, waitFor } from '@testing-library/react';
import { Card } from '../../src/components/Card/Card';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../src/utils/test-utils';
import * as hook from '../../src/store/detailsSlice';
import * as hooks from '../../src/store/checkedSlice';
import * as hooksUid from '../../src/store/uidSlice';
import { cardSeasons } from '../mocksData/mocks';
import { vi, describe, afterEach, it, expect } from 'vitest';

vi.mock('../../src/store/detailsSlice');
vi.mock('../../src/store/checkedSlic');
vi.mock('next/compat/router');
vi.mock('next/compat/router', () => ({
  useRouter() {
    return {
      pathname: '',
      push: () => {},
      query: {},
      events: {
        on: () => {},
        off: () => {},
      },
    };
  },
}));

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
    const link = getByRole('button');
    expect(link).toBeInTheDocument();
  });
  it('should have path for navigate to details', async () => {
    const { getByRole } = renderWithProviders(<Card item={cardSeasons} />);
    userEvent.setup();
    await userEvent.click(getByRole('button'));
    expect(getByRole('button')).toBeInTheDocument();
    // await waitFor(() =>
    //   expect(window.location.pathname).toEqual('/details/:1/')
    // );
  });
  it('should navigate to details', async () => {
    const { getByText } = renderWithProviders(<Card item={cardSeasons} />);
    const user = userEvent.setup();
    expect(getByText('Title1')).toBeInTheDocument();
    await user.click(getByText('Title1'));
  });
  it('should have checkbox', async () => {
    const dispatchAdded = vi
      .spyOn(hooks, 'cardAdded')
      .mockReturnValue({ payload: '1', type: 'checked/cardAdded' });
    const checkUid = vi
      .spyOn(hooksUid, 'uidChecked')
      .mockReturnValue({ payload: '1', type: 'uid/uidChecked' });
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
    userEvent.click(getByRole('checkbox'));
    await waitFor(() => {
      expect(getByRole('checkbox')).toBeChecked();
      expect(dispatchAdded).toHaveBeenCalledWith('1');
      expect(checkUid).toHaveBeenCalledWith('1');
    });
    fireEvent.click(getByRole('checkbox'));
    await waitFor(() => {
      expect(getByRole('checkbox')).not.toBeChecked();
      expect(hooks.cardRemoved).toHaveBeenCalledWith('1');
      expect(hook.detailsRemoved).toHaveBeenCalledWith('1');
    });
  });
});
