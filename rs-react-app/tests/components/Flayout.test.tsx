import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../src/app/shared/utils/test-utils';
import * as hook from '../../src/app/store/detailsSlice';
import * as hooks from '../../src/app/store/checkedSlice';
import * as funk from '../../src/app/shared/utils/helpers';
import { Main } from '../../src/app/pages/Main/Main';

vi.mock('../../src/store/detailsSlice');
vi.mock('../../src/store/checkedSlice');
vi.mock('../../src/utils/helpers');

describe('Flayout', () => {
  it('should', async () => {
    vi.spyOn(hook, 'selectAllDetails').mockReturnValue([]);
    vi.spyOn(hooks, 'selectCheckedNumber').mockReturnValue(2);
    const convertTo = vi.spyOn(funk, 'convertToCSV').mockReturnValue('');
    const spy = vi.spyOn(hooks, 'removedAll').mockReturnValue({
      payload: [],
      type: 'checked/removedAll',
    });

    const { getByRole, getByTestId } = renderWithProviders(<Main />);
    const numbers = getByTestId('checkedNumber');
    expect(numbers).toHaveTextContent('2');
    expect(getByRole('button', { name: 'Unselect all' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Download' })).toBeInTheDocument();
    fireEvent.click(getByRole('button', { name: 'Download' }));
    expect(convertTo).toHaveBeenCalled();
    fireEvent.click(getByRole('button', { name: 'Unselect all' }));
    expect(spy).toHaveBeenCalled();
  });
});
