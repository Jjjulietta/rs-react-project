import axios, { AxiosInstance } from 'axios';
import { AllSeasonSearch, SeasonType } from '../types/apiTypes';
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
  ): Promise<AxiosResponseObject> {
    return this.api.post(url, { title }, { params, headers });
  }
}
