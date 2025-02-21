import {
  memoizedSelectorsCheckedItems,
  memoizedSelectorsCheckedItemsNumber,
} from '../../src/app/store/checkedSlice';
import { memoizedSelectorsAllDetails } from '../../src/app/store/detailsSlice';
import { SeasonDetails } from '../../src/app/models/types/apiTypes';
import { details } from '../mocksData/mocks';

describe('selectors', () => {
  it('should select all checked items from state object', () => {
    const checkedItems = ['1', '2'];
    expect(memoizedSelectorsCheckedItems.resultFunc(checkedItems)).toEqual([
      '1',
      '2',
    ]);
  });
  it('should select checked number from state object', () => {
    const checkedItems = ['1', '2'];
    expect(
      memoizedSelectorsCheckedItemsNumber.resultFunc(checkedItems)
    ).toEqual(2);
  });
  it('should select all checked details from state object', () => {
    const checkedDetails: SeasonDetails[] = [details];
    expect(memoizedSelectorsAllDetails.resultFunc(checkedDetails)).toEqual([
      details,
    ]);
  });
});
