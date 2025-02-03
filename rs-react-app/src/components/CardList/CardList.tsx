import { Seasons } from '../../types/apiTypes';
import styles from './CardList.module.css';
import { Loader } from '../Loader/Loader';
import { Card } from '../Card/Card';

interface PropsState {
  items: Seasons[];
  error: string | undefined;
  isLoading: boolean;
}

export const CardList = ({ items, error, isLoading }: PropsState) => {
  return (
    <>
      <h2>Star Trek Seasons - Results</h2>
      {error ? (
        <div className={styles.error_template}>{error}</div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr className={styles.head_item}>
                <th className={styles.th}>Season name</th>
                <th>Season Description</th>
              </tr>
            </thead>
            <tbody>
              {items.map((value) => {
                return <Card item={value} key={value.uid} />;
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
