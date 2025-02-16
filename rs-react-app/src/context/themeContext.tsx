import { createContext, useContext } from 'react';
import { Theme } from '../utils/constants';

export const defaultContext = {
  theme: Theme.Light,
  setTheme: (theme: Theme | string) => {
    return theme;
  },
};

export const ThemeContext = createContext(defaultContext);
export const useTheme = () => {
  return useContext(ThemeContext);
};
