import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, URLS } from '../utils/constants';
import { AllSeasonSearch, SeasonType } from '../types/apiTypes';
import { SearchParams, Uid } from '../services/http.service';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getDetails: builder.query<SeasonType, Uid>({
      query: (uid) => ({
        url: URLS.GET,
        params: uid,
      }),
    }),
    getCheckedDetails: builder.query<SeasonType, Uid>({
      query: (uid) => ({
        url: URLS.GET,
        params: uid,
      }),
    }),
    getSearchCards: builder.query<AllSeasonSearch, SearchParams>({
      query: (params) => {
        const urlSearch = new URLSearchParams();
        if (params.title) {
          urlSearch.set('title', params?.title);
          return {
            url: URLS.SEARCH,
            method: 'POST',
            body: urlSearch,
            headers: params.headers,
            params: params.params,
          };
        }
        return {
          url: URLS.PAGINATION,
          params: params.params,
        };
      },
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useGetCheckedDetailsQuery,
  useGetSearchCardsQuery,
} = apiSlice;
