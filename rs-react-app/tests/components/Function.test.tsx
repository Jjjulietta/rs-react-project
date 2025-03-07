import { describe, it, expect } from 'vitest';
import { stringTransform, getDetailsSeries } from '../../src/utils/helpers';
import { details, seasonApi } from '../mocksData/mocks';

describe('stringTransform', () => {
  it('should', () => {
    expect(stringTransform('numberOfEpisodes')).toEqual('number  of  episodes');
  });
});

describe('getDetails', () => {
  it('should', () => {
    expect(getDetailsSeries(seasonApi)).toEqual(details);
  });
});
