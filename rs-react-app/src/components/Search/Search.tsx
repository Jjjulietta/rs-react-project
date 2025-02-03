import { useRef } from 'react';
import styles from './Search.module.css';
import { Button } from '../Button/Button';
import { SEARCH_VALUE } from '../../utils/constants';

interface PropsState {
  value: string;
  onSearch: (val: string) => void;
}

export const Search = ({ value, onSearch }: PropsState) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = () => {
    const input = inputRef?.current;
    if (input?.value) {
      onSearch(input?.value.trim());
      setLocalStorageData(input?.value.trim());
    }
  };

  const setLocalStorageData = (value: string) =>
    localStorage.setItem(SEARCH_VALUE, value);

  return (
    <div className={styles.form}>
      <label className={styles.label}>search by season name</label>

      <input
        ref={inputRef}
        type="search"
        name="search"
        className={styles.input}
        defaultValue={value}
      />
      <Button
        type="submit"
        className={styles.btn}
        name="sabmit"
        onClick={onSubmit}
      />
    </div>
  );
};
