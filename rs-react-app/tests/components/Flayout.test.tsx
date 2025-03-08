import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../src/utils/test-utils';
import * as hook from '../../src/store/detailsSlice';
import * as hooks from '../../src/store/checkedSlice';
import * as funk from '../../src/utils/helpers';
import { vi, describe, afterEach, it, expect } from 'vitest';
import { cardSeasons, details } from 'tests/mocksData/mocks';
import { Flayout } from 'src/components/Flayout/Flayout';

vi.mock('../../src/store/detailsSlice');
vi.mock('../../src/store/checkedSlice');
vi.mock('../../src/utils/helpers');
vi.mock('next/compat/router', () => ({
  useRouter() {
    return {
      pathname: '',
      push: vi.fn(),
      replace: () => {},
      query: { uid: '1' },
      events: {
        on: vi.fn(),
        off: () => {},
      },
    };
  },
}));

describe('Flayout', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should', async () => {
    vi.spyOn(hook, 'selectAllDetails').mockReturnValue([cardSeasons]);
    vi.spyOn(hooks, 'selectCheckedNumber').mockReturnValue(2);
    vi.spyOn(hook, 'detailsAdded').mockReturnValue({
      payload: cardSeasons,
      type: 'details/detailsAdded',
    });
    const convertTo = vi.spyOn(funk, 'convertToCSV').mockReturnValue('');
    vi.spyOn(funk, 'getDetailsSeries').mockReturnValue(details);
    const spy = vi.spyOn(hooks, 'removedAll').mockReturnValue({
      payload: [],
      type: 'checked/removedAll',
    });
    const removedDetails = vi.spyOn(hook, 'removedAllDetails').mockReturnValue({
      payload: [],
      type: 'details/removedAllDetails',
    });

    const { getByRole, getByTestId } = renderWithProviders(<Flayout />);
    const numbers = getByTestId('checkedNumber');
    expect(numbers).toHaveTextContent('2');
    expect(getByRole('button', { name: 'Unselect all' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Download' })).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: 'Download' }));
    expect(convertTo).toHaveBeenCalled();
    fireEvent.click(getByRole('button', { name: 'Unselect all' }));
    expect(spy).toHaveBeenCalled();
    expect(removedDetails).toHaveBeenCalled();
  });
});
