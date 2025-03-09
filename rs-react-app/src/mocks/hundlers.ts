import { http, HttpResponse } from 'msw';
import { cleanup } from '@testing-library/react';
import { apiSlice } from '../store/apiSlice';
import { setupStore } from '../store/store';
import { server } from './api/server';
import { cards, cardsSearch, details } from './mocks';
import { beforeAll, afterEach, afterAll } from 'vitest';

window.fetch = fetch;
window.Headers = Headers;

const store = setupStore();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
  store.dispatch(apiSlice.util.resetApiState());
});

afterAll(() => server.close());

export const handlers = [
  http.get('https://stapi.co/api/v1/rest/season/search', () => {
    const response = HttpResponse.json(cards);
    return response;
  }),
  http.get('https://stapi.co/api/v1/rest/season', () => {
    const response = HttpResponse.json(details);
    return response;
  }),
  http.post('https://stapi.co/api/v1/rest/season/search', () => {
    const response = HttpResponse.json(cardsSearch);
    return response;
  }),
];
