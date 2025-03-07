import {
  SeriesDetails,
  SeasonDetails,
  Seasons,
  SeasonType,
  SeriesType,
} from '../../src/models/types/api';

export const series: SeriesDetails = {
  abbreviation: 'DIS',
  episodesCount: 55,
  featureLengthEpisodesCount: 0,
  originalBroadcasterName: 'Paramount+',
  originalRunStartDate: '2017-09-24',
  productionCompanyName: 'CBS Studios',
  productionStartYear: 2017,
  seasonsCount: 4,
  title: 'Star Trek: Discovery',
};

export const details: SeasonDetails = {
  uid: '1',
  title: 'Title1',
  series: series,
  seasonNumber: 1,
  numberOfEpisodes: 2,
  episodes: [],
};

export const detailsArray = [
  {
    uid: '2',
    title: 'Title2',
    series: series,
    seasonNumber: 2,
    numberOfEpisodes: 3,
    episodes: [],
  },
  {
    uid: '1',
    title: 'Title1',
    series: series,
    seasonNumber: 1,
    numberOfEpisodes: 2,
    episodes: [],
  },
];

export const cardSeasons: Seasons = {
  numberOfEpisodes: 2,
  title: 'Title1',
  uid: '1',
  seasonNumber: 1,
  series: {
    title: 'series1',
    uid: 1,
  },
};

export const cardsSeasons: Seasons[] = [
  {
    numberOfEpisodes: 2,
    title: 'Title1',
    uid: '1',
    seasonNumber: 1,
    series: {
      title: 'series1',
      uid: 1,
    },
  },
  {
    numberOfEpisodes: 2,
    title: 'Title2',
    uid: '2',
    seasonNumber: 2,
    series: {
      title: 'series2',
      uid: 2,
    },
  },
];

export const seriesApi: SeriesType = {
  abbreviation: 'DIS',
  episodesCount: 55,
  featureLengthEpisodesCount: 0,
  originalBroadcaster: { uid: 'COMA0000201662', name: 'Paramount+' },
  originalRunEndDate: null,
  originalRunStartDate: '2017-09-24',
  productionCompany: { uid: 'COMA0000052430', name: 'CBS Studios' },
  productionEndYear: null,
  productionStartYear: 2017,
  seasonsCount: 4,
  title: 'Star Trek: Discovery',
  uid: 'SEMA0000201665',
};

export const seasonApi: SeasonType = {
  season: {
    uid: '1',
    title: 'Title1',
    series: seriesApi,
    seasonNumber: 1,
    numberOfEpisodes: 2,
    episodes: [],
  },
};
