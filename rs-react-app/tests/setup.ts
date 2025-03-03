import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';
import { setupStore } from '../src/store/store';
import { server } from '../src/mocks/api/server';
import { apiSlice } from '../src/store/apiSlice';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

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
