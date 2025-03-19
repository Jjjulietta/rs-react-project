import { BASE_URL, FiltersArray, URLS } from '../models/constants';
import { CountryApi, Region } from '../models/types';

export const getCountryes = async () => {
  const url = new URL(`${BASE_URL}${URLS.ALL}`);
  url.searchParams.set('fields', FiltersArray.join(','));
  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data: Promise<CountryApi[]> = await response.json();
  console.log(data);
  return data;
};

export const getCountryByRegion = async (region: string) => {
  const url = new URL(`${BASE_URL}${URLS.REGION}/${region}`);

  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data: Promise<Region[]> = await response.json();
  console.log(data);
  return data;
};
