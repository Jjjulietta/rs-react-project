import reducer, {
  cardAdded,
  cardRemoved,
  removedAll,
} from '../../src/app/store/checkedSlice';
import reduserDetails, {
  detailsAdded,
  detailsRemoved,
  removedAllDetails,
} from '../../src/app/store/detailsSlice';
import { SeasonDetails } from '../../src/app/models/types/api';
import { details, detailsArray } from '../mocksData/mocks';

describe('checkedSlice', () => {
  it('should return initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual([]);
  });
  it('should add new item with "cardAdded" action', () => {
    const previousState: string[] = [];
    const result = reducer(previousState, cardAdded('1'));
    expect(result).toEqual(['1']);
    expect(result[0]).toBe('1');
  });
  it('should remove item with "cardRemoves" action', () => {
    const previousState: string[] = ['1', '2'];
    const result = reducer(previousState, cardRemoved('1'));
    expect(result).toEqual(['2']);
    expect(result[0]).toBe('2');
    expect(result.includes('1')).toBeFalsy();
  });
  it('should remove all item with "removedAll" action', () => {
    const previousState: string[] = ['1', '2'];
    const result = reducer(previousState, removedAll([]));
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(result.includes('1')).toBeFalsy();
    expect(result.includes('2')).toBeFalsy();
  });
});

describe('detailsSlice', () => {
  it('should return initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual([]);
  });
  it('should add new item with "detailsAdded" action', () => {
    const previousState: SeasonDetails[] = [];
    const result = reduserDetails(previousState, detailsAdded(details));
    expect(result).toEqual([details]);
  });
  it('should remove item with "cardRemoves" action', () => {
    const previousState: SeasonDetails[] = detailsArray;
    const result = reduserDetails(previousState, detailsRemoved('2'));
    expect(result).toEqual([details]);
    expect(result).toHaveLength(1);
  });
  it('should remove all details with "removedAll" action', () => {
    const previousState: SeasonDetails[] = detailsArray;
    const result = reduserDetails(previousState, removedAllDetails([]));
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
