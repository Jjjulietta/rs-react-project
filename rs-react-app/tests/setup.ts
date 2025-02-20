import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';
import { setupStore } from '../src/app/store/store';
import { server } from '../src/mocks/api/server';
import { apiSlice } from '../src/app/store/apiSlice';
import { cleanup } from '@testing-library/react';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
  store.dispatch(apiSlice.util.resetApiState());
});

afterAll(() => server.close());
