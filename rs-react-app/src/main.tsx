import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

import { ThemeContextProvider } from './context/themeProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
const root = document.getElementById('root');
if (!root) {
  throw new Error('element not found');
}
createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
);
