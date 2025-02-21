import { stringTransform } from '../../src/app/shared/utils/helpers';

describe('function', () => {
  it('should', () => {
    expect(stringTransform('numberOfEpisodes')).toEqual('number  of  episodes');
  });
});
