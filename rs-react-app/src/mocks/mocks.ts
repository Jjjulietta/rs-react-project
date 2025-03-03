import { SeriesType, SeasonType, AllSeasonSearch } from '../models/types/api';

export const series: SeriesType = {
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

export const details: SeasonType = {
  season: {
    uid: '1',
    title: 'Title1',
    series: series,
    seasonNumber: 1,
    numberOfEpisodes: 2,
    episodes: [],
  },
};

export const cards: AllSeasonSearch = {
  page: {
    pageNumber: 1,
    pageSize: 2,
    numberOfElements: 3,
    totalElements: 3,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
  sort: {
    clauses: [[]],
  },
  seasons: [
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
      numberOfEpisodes: 4,
      title: 'Title2',
      uid: '2',
      seasonNumber: 2,
      series: {
        title: 'series2',
        uid: 2,
      },
    },
    {
      numberOfEpisodes: 6,
      title: 'Title3',
      uid: '3',
      seasonNumber: 3,
      series: {
        title: 'series3',
        uid: 3,
      },
    },
  ],
};

export const cardsSearch: AllSeasonSearch = {
  page: {
    pageNumber: 1,
    pageSize: 2,
    numberOfElements: 3,
    totalElements: 3,
    totalPages: 1,
    firstPage: true,
    lastPage: true,
  },
  sort: {
    clauses: [[]],
  },
  seasons: [
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
      numberOfEpisodes: 4,
      title: 'Title1',
      uid: '2',
      seasonNumber: 2,
      series: {
        title: 'series2',
        uid: 2,
      },
    },
    {
      numberOfEpisodes: 6,
      title: 'Title1',
      uid: '3',
      seasonNumber: 3,
      series: {
        title: 'series3',
        uid: 3,
      },
    },
  ],
};
