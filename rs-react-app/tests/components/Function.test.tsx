import {
  stringTransform,
  getDetails,
} from '../../src/app/shared/utils/helpers';
import { details, seasonApi } from '../mocksData/mocks';

describe('stringTransform', () => {
  it('should', () => {
    expect(stringTransform('numberOfEpisodes')).toEqual('number  of  episodes');
  });
});

describe('getDetails', () => {
  it('should', () => {
    expect(getDetails(seasonApi)).toEqual(details);
  });
});
