import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CountryData } from '../models/types';
import { createSelector } from '@reduxjs/toolkit/react';

export const countryApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://countriesnow.space/api/v0.1/countries/',
  }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<CountryData, ''>({
      query: () => 'iso',
    }),
  }),
});

const emptyCountry: string[] = [];

export const { useGetAllCountriesQuery } = countryApi;
export const selectCountryResult =
  countryApi.endpoints.getAllCountries.select('');
export const selectAllCountries = createSelector(
  selectCountryResult,
  (countryResult) => {
    return countryResult?.data?.data.map((item) => item.name) ?? emptyCountry;
  }
);
