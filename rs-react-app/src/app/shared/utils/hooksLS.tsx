import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  val?: string
): readonly [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(localStorage.getItem(key) || val || '');

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
