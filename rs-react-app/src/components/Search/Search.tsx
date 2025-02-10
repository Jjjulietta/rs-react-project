import { useRef } from 'react';
import styles from './Search.module.css';
import { Button } from '../Button/Button';
import { SEARCH_VALUE } from '../../utils/constants';
import { useLocalStorage } from '../../utils/hooks';

interface PropsState {
  onSearch: (val: string) => void;
}

export const Search = ({ onSearch }: PropsState) => {
  const [value, setValue] = useLocalStorage(SEARCH_VALUE, '');
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = () => {
    const input = inputRef?.current;
    if (input?.value) {
      const str = input?.value.trim();
      onSearch(str);
      setValue(str);
    }
  };

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
        name="submit"
        onClick={onSubmit}
      />
    </div>
  );
};
