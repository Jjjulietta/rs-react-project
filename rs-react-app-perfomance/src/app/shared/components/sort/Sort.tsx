import { useState, ChangeEvent, memo } from 'react';
import { Order, SORT_FIELDS, sortArray } from '../../../models/constants';
import styles from './sort.module.css';

interface SortProps {
  setOrder: (order: string | undefined, field: string | undefined) => void;
}

export const Sort = memo(({ setOrder }: SortProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>();
  const [checkedAsc, setCheckedAsc] = useState(false);
  const [checkedDesc, setCheckedDesc] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    setOrder(selectedOrder, e.target.value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOrder(e.target.value);
    setCheckedAsc(e.target.value === Order.ASC);
    setCheckedDesc(e.target.value === Order.DESC);
    setOrder(e.target.value, selectedValue);
  };

  const handleReset = () => {
    setCheckedAsc(false);
    setCheckedDesc(false);
    setSelectedValue(SORT_FIELDS.SELECT);
    setSelectedOrder(undefined);
    setOrder(undefined, undefined);
  };
  return (
    <div className={styles.sort}>
      <label htmlFor="select" className={styles.label}>
        Sort by
      </label>
      <select
        id="select"
        value={selectedValue}
        onChange={handleChange}
        className={styles.select}
      >
        {sortArray.map((value, index) => (
          <option key={index} className={styles.option} value={value}>
            {value}
          </option>
        ))}
      </select>
      <label htmlFor="order" className={styles.label}>
        Sort by order
        <input
          type="radio"
          name="order"
          className={styles.input}
          value={Order.ASC}
          onChange={onChange}
          checked={checkedAsc}
        />
        <span>{Order.ASC}</span>
        <input
          type="radio"
          name="order"
          value={Order.DESC}
          className={styles.input}
          onChange={onChange}
          checked={checkedDesc}
        />
        <span>{Order.DESC}</span>
      </label>
      <button type="reset" onClick={handleReset}>
        reset
      </button>
    </div>
  );
});

Sort.displayName = 'Sort';
