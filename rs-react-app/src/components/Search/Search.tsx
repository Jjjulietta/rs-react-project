import { Component, createRef } from 'react';
import styles from './Search.module.css';
import Button from '../Button/Button';

interface PropsState {
  value: string;
  onSearch: (val: string) => void;
}

export default class Search extends Component<PropsState> {
  inputRef = createRef<HTMLInputElement>();
  onSubmit = () => {
    const input = this.inputRef?.current;
    console.log(input?.value);
    if (input?.value) {
      this.props.onSearch(input?.value);
    }
  };

  render() {
    return (
      <div className={styles.form}>
        <label className={styles.label}>search</label>

        <input
          ref={this.inputRef}
          type="search"
          name="search"
          className={styles.input}
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
