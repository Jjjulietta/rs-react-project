import { useState, useEffect, useMemo } from 'react';
import { THEME, Theme } from '../app/models/constants/constants.ts';
import { defaultContext, ThemeContext } from './themeContext';
import { useLocalStorage } from '../app/shared/utils/hooksLS.tsx';

export const ThemeContextProvider = (props: { children: React.ReactNode }) => {
  const [value, setValue] = useLocalStorage(THEME, Theme.Light);
  const [theme, setTheme] = useState(value || Theme.Light);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    setValue(theme);
  }, [setValue, theme]);
  const context = useMemo(
    () => ({ theme, setTheme }) as typeof defaultContext,
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
};
