import { stringTransform } from '../../src/utils/helpers';

describe('function', () => {
  it('should', () => {
    expect(stringTransform('numberOfEpisodes')).toEqual('number  of  episodes');
  });
});
