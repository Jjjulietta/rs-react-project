export const URLS = {
  GET: '/v1/rest/season',
  PAGINATION: '/v1/rest/season/search',
  SEARCH: '/v1/rest/season/search',
};

export const SEARCH_VALUE = 'searchValue';

export const BASE_URL = 'https://stapi.co/api';

export const PAGE_SIZE = 6;
export const FIRST_PAGE = 0;

export const PAGINATION_DEFAULT = {
  pageNumber: FIRST_PAGE + 1,
  pageSize: PAGE_SIZE,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  firstPage: true,
  lastPage: true,
};
