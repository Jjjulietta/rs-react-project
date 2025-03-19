import { ChangeEvent, useState } from 'react';
import styles from './search.module.css';

interface PropsState {
  onSearch: (val: string) => void;
}

export const Search = ({ onSearch }: PropsState) => {
  const [value, setValue] = useState<string | undefined>();

  const onSubmit = () => {
    if (value) {
      const str = value.trim();
      onSearch(str);
    } else {
      onSearch('');
    }
    setValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.form}>
      <label className={styles.label}>search by country name</label>
      <input
        type="search"
        name="search"
        className={styles.input}
        onChange={handleChange}
        value={value}
      />
      <button type="submit" onClick={onSubmit} className={styles.btn}>
        submit
      </button>
    </div>
  );
};
