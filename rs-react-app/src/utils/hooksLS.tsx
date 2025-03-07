import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  val?: string
): readonly [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(val);
  const [isInitialized, setIsInitialized] = useState(false);
  // const [value, setValue] = useState(localStorage.getItem(key) || val || '');

  useEffect(() => {
    const localstorageValue = localStorage.getItem(key);
    console.log(localstorageValue);
    if (localstorageValue !== null) {
      setValue(localstorageValue);
    }
    setIsInitialized(true);
    // localStorage.setItem(key, value);
  }, [key]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(key, value);
    }
  }, [isInitialized, key, value]);

  return [value, setValue];
};
