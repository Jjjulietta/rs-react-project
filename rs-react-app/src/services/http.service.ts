import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AllSeasonSearch, SeasonType } from '../types/apiTypes';
import { URLS } from '../utils/constants';

interface Pagination {
  pageNumber?: number;
  pageSize?: number;
}

interface Sort extends Pagination {
  sort?: string;
}

export default class HttpService {
  api: AxiosInstance;
  constructor(baseURL = '') {
    this.api = axios.create({
      baseURL: `https://stapi.co/api/${baseURL}`,
      timeout: 10000,
    });
  }

  async getSeason(url: string, params: { uid: string }): Promise<SeasonType> {
    const { data } = await this.api.get<SeasonType>(url, { params });
    return data;
  }

  async getPagination(
    url: string = URLS.PAGINATION,
    params?: Pagination
  ): Promise<AllSeasonSearch> {
    const { data } = await this.api.get<AllSeasonSearch>(url, { params });
    console.log(data);
    return data;
  }

  async SearchData(
    url: string,
    title: string,
    params: Sort,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded';
    }
  ): Promise<AxiosResponse> {
    return this.api.post<AllSeasonSearch>(url, { title }, { params, headers });
  }
}
