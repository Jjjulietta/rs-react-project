export interface SeasonType {
  season: {
    uid: string;
    title: string;
    series: SeriesType;
    seasonNumber: number;
    numberOfEpisodes: number;
    episodes: EpisodeType[];
  };
}

export interface Seasons {
  numberOfEpisodes: number;
  title: string;
  uid: string;
  seasonNumber: number;
  series: {
    title: string;
    uid: number;
  };
}

export interface PaginationI {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}
export interface AllSeasonSearch {
  page: PaginationI;
  sort: {
    clauses: [[]];
  };
  seasons: Seasons[];
}

export interface SearchBody {
  title: string;
  seasonNumberFrom?: number;
  seasonNumberTo?: number;
  numberOfEpisodesFrom?: number;
  numberOfEpisodesTo?: number;
}

export enum Statuses {
  Sucсess = 200,
  ErrorClient = 400,
  ErrorServer = 500,
}

export interface SeasonDetails {
  uid: string;
  title: string;
  series: SeriesDetails | null;
  seasonNumber: number;
  numberOfEpisodes: number;
  episodes: EpisodeDetails[] | [];
}

export interface EpisodeType {
  uid: string;
  title: string;
  titleGerman: string | null;
  titleItalian: string | null;
  titleJapanese: string | null;
  series: {
    uid: string;
    title: string;
  };
  season: {
    uid: string;
    title: string;
  };
  seasonNumber: number;
  episodeNumber: number;
  productionSerialNumber: string;
  featureLength: true;
  stardateFrom: number | null;
  stardateTo: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  usAirDate: string;
  finalScriptDate: string | null;
}

export interface SeriesType {
  uid: string;
  title: string;
  abbreviation: string;
  productionStartYear: number | null;
  productionEndYear: number | null;
  originalRunStartDate: string | null;
  originalRunEndDate: string | null;
  seasonsCount: number;
  episodesCount: number;
  featureLengthEpisodesCount: number;
  productionCompany: {
    uid: string;
    name: string;
  };
  originalBroadcaster: {
    uid: string;
    name: string;
  };
}

export interface SeriesDetails {
  title: string;
  abbreviation: string;
  productionStartYear: number | null;
  originalRunStartDate: string | null;
  seasonsCount: number;
  episodesCount: number;
  featureLengthEpisodesCount: number;
  productionCompanyName: string;
  originalBroadcasterName: string;
}

export interface EpisodeDetails {
  uid: string;
  title: string;
  episodeNumber: number;
  productionSerialNumber: string;
  usAirDate: string;
}

export interface Pagination {
  pageNumber?: number;
  pageSize?: number;
}

export type Uid = {
  uid: string;
};

export interface Sort extends Pagination {
  sort?: string;
}
export interface SearchParams {
  title?: string;
  params: Sort;
  headers?: { 'Content-Type': string };
}
