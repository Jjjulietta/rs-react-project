export enum URLS {
  ALL = 'all',
  REGION = 'region',
}

export const BASE_URL = 'https://restcountries.com/v3.1/';

export enum SORT_FIELDS {
  SELECT = 'select',
  NAME = 'name',
  POPULATION = 'population',
}

export enum FILTERS_FIELDS {
  REGION = 'region',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export const FiltersArray = ['name', 'region', 'population', 'flag'];
export const sortArray = Object.values(SORT_FIELDS);
