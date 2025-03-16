import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { setupStore } from './app/store/store.tsx';
import { Provider } from 'react-redux';
import { countryApi } from './app/store/countryApi.tsx';

const root = document.getElementById('root');
if (!root) {
  throw new Error('element not found');
}

const store = setupStore();
store.dispatch(countryApi.endpoints.getAllCountries.initiate(''));

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
