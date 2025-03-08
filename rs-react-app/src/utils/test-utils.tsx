import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { setupStore } from '../store/store';
import StoreProvider from 'src/store/StoreProvider';

export function renderWithProviders(ui: React.ReactElement) {
  const { store = setupStore(), ...renderOptions } = {};
  const Wrapper = ({ children }: PropsWithChildren) => (
    <StoreProvider>{children}</StoreProvider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
