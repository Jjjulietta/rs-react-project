export interface SeasonType {
  season: {
    uid: string;
    title: string;
    series: {
      uid: string;
      title: string;
      abbreviation: string;
      productionStartYear: number;
      productionEndYear: number;
      originalRunStartDate: Date;
      originalRunEndDate: Date;
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
    };
    seasonNumber: number;
    numberOfEpisodes: number;
    episodes: [[]];
  };
}

export interface Seasons {
  numberOfEpisodes: number;
  title: string;
  uid: number;
  seasonNumber: number;
  series: {
    title: string;
    uid: number;
  };
}

export interface AllSeasonSearch {
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
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
