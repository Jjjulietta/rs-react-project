import axios, { AxiosInstance } from 'axios';
import {
  AllSeasonSearch,
  EpisodeDetails,
  SeasonDetails,
  SeasonType,
  SeriesDetails,
} from '../types/apiTypes';
import { BASE_URL, URLS } from '../utils/constants';

interface Pagination {
  pageNumber?: number;
  pageSize?: number;
}

interface Sort extends Pagination {
  sort?: string;
}

interface AxiosResponseObject {
  data: AllSeasonSearch;
  status: number;
  statusText: string;
  headers: string;
  config: unknown;
}

export default class HttpService {
  api: AxiosInstance;
  constructor(baseURL = '') {
    this.api = axios.create({
      baseURL: BASE_URL + `/${baseURL}`,
      timeout: 10000,
    });
  }

  async getSeason(
    url: string,
    params: { uid: string }
  ): Promise<SeasonDetails> {
    const { data } = await this.api.get<SeasonType>(url, { params });
    const episodes = data.season.episodes.reduce<EpisodeDetails[]>(
      (details, item) => {
        details.push({
          uid: item.uid,
          title: item.title,
          episodeNumber: item.episodeNumber,
          productionSerialNumber: item.productionSerialNumber,
          usAirDate: item.usAirDate,
        });
        return details;
      },
      []
    );
    const {
      title,
      abbreviation,
      productionStartYear,
      originalRunStartDate,
      seasonsCount,
      episodesCount,
      featureLengthEpisodesCount,
      productionCompany: { name: productionCompanyName },
      originalBroadcaster: { name: originalBroadcasterName },
    } = data.season.series;
    const series: SeriesDetails = {
      title,
      abbreviation,
      productionStartYear,
      originalRunStartDate,
      seasonsCount,
      episodesCount,
      featureLengthEpisodesCount,
      productionCompanyName,
      originalBroadcasterName,
    };
    return {
      uid: data.season.uid,
      title: data.season.title,
      seasonNumber: data.season.seasonNumber,
      series: series,
      numberOfEpisodes: data.season.numberOfEpisodes,
      episodes: episodes,
    };
  }

  async getPagination(
    url: string = URLS.PAGINATION,
    params?: Pagination
  ): Promise<AllSeasonSearch> {
    const { data } = await this.api.get<AllSeasonSearch>(url, { params });
    return data;
  }

  async SearchData(
    url: string,
    title: string,
    params: Sort,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded';
    }
  ): Promise<AxiosResponseObject> {
    return this.api.post(url, { title }, { params, headers });
  }
}
