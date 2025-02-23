import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeContextProvider } from './context/themeProvider.tsx';
import { Provider } from 'react-redux';
import { setupStore } from './app/store/store.ts';

const root = document.getElementById('root');

if (!root) {
  throw new Error('element not found');
}

const store = setupStore();

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
