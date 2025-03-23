import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import styles from './search.module.css';

interface PropsState {
  onSearch: (val: string) => void;
}

export const Search = memo(({ onSearch }: PropsState) => {
  const [value, setValue] = useState<string>('');

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSearch(value?.trim());
      setValue('');
    },
    [onSearch, value]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>search by country name</label>
      <input
        type="search"
        name="search"
        className={styles.input}
        onChange={handleChange}
        value={value}
      />
      <button type="submit" className={styles.btn}>
        submit
      </button>
    </form>
  );
});

Search.displayName = 'Search';
