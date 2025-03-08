import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  val?: string
): readonly [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(val || '');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const localstorageValue = localStorage.getItem(key);
    if (localstorageValue !== null) {
      setValue(localstorageValue);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, value);
    }
  }, [isInitialized, key, value]);

  return [value, setValue];
};
