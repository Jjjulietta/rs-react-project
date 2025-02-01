import { Component, createRef } from 'react';
import styles from './Search.module.css';
import Button from '../Button/Button';
import { SEARCH_VALUE } from '../../utils/constants';

interface PropsState {
  value: string;
  onSearch: (val: string) => void;
}

export default class Search extends Component<PropsState> {
  inputRef = createRef<HTMLInputElement>();
  onSubmit = () => {
    const input = this.inputRef?.current;
    if (input?.value) {
      this.props.onSearch(input?.value.trim());
      this.setLocalStorageData(input?.value.trim());
    }
  };

  setLocalStorageData = (value: string) =>
    localStorage.setItem(SEARCH_VALUE, value);

  render() {
    return (
      <div className={styles.form}>
        <label className={styles.label}>search by season name</label>

        <input
          ref={this.inputRef}
          type="search"
          name="search"
          className={styles.input}
          defaultValue={this.props.value}
        />
        <Button
          type="submit"
          className={styles.btn}
          name="sabmit"
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}
