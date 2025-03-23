import { Order, SORT_FIELDS } from './constants';

export interface CountryApi {
  flag: string;
  name: CountryName;
  population: number;
  region: string;
}

export interface CountryName {
  common: string;
  nativeName: { eng: { common: string; official: string } };
  official: string;
}

export interface Country {
  flag: string;
  name: string;
  population: number;
  region: string;
}

export type Region = Pick<Country, 'region'>;

export type OrderType = {
  value: Order;
};

export type SortFields = {
  value: SORT_FIELDS;
};
