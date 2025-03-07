import { Seasons } from '../../models/types/api';
import styles from './CardList.module.css';
import RouteLoader from '../Loader/Loader';
import { Card } from '../Card/Card';

interface CardList {
  items: Seasons[];
  error?: string | undefined;
  isLoading?: boolean;
}

export const CardList = ({ items, error }: CardList) => {
  return (
    <>
      <h2>Star Trek Seasons - Results</h2>
      <RouteLoader />
      {error ? (
        <div className={styles.error_template}>{error}</div>
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
              {items &&
                items.map((value) => {
                  return <Card item={value} key={value.uid} />;
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
