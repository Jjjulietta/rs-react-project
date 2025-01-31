import { Component } from 'react';
import { Seasons } from '../../types/apiTypes';
import Card from '../Card/Card';
import styles from './CardList.module.css';
import { Loader } from '../Loader/Loader';

interface PropsState {
  items: Seasons[];
  error: string | undefined;
  isLoading: boolean;
}

export default class CardList extends Component<PropsState> {
  render() {
    return (
      <>
        <h2>Results</h2>
        {this.props.error ? (
          <div className={styles.error_template}>{this.props.error}</div>
        ) : this.props.isLoading ? (
          <Loader />
        ) : (
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr className={styles.head_item}>
                <th className={styles.th}>Item name</th>
                <th>Item Description</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map((value) => {
                return <Card item={value} key={value.uid} />;
              })}
            </tbody>
          </table>
        )}
      </>
    );
  }
}
