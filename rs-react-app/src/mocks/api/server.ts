import { setupServer } from 'msw/node';
import { handlers } from '../hundlers';

export const server = setupServer(...handlers);
