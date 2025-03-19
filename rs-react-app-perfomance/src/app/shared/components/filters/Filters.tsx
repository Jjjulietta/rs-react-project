import { ChangeEvent, useState } from 'react';
import styles from './filters.module.css';

export interface FiltersProps {
  regions: string[] | [];
  setRegion: (val: string) => void;
}

export const Filters = ({ regions, setRegion }: FiltersProps) => {
  const [selectedValue, setSelectedValue] = useState('region');
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedValue(e.target.value);
    setRegion(e.target.value);
  };
  return (
    <div className={styles.filter}>
      <label htmlFor="select" className={styles.label}>
        Select region
      </label>
      <select
        id="select"
        value={selectedValue}
        onChange={handleChange}
        className={styles.select}
      >
        {regions.map((region, index) => (
          <option key={index} className={styles.option} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};
