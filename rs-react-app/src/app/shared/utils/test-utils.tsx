import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { BrowserRouter } from 'react-router';

export function renderWithProviders(ui: React.ReactElement) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {};

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
