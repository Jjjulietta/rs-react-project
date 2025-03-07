import { AllSeasonSearch } from '../../models/types/api';
import styles from './CardList.module.css';
import { Card } from '../Card/Card';
import { Pagination } from '../Pagination/Pagination';

interface CardList {
  cards: AllSeasonSearch;
  error?: string | undefined;
  isLoading?: boolean;
}

export const CardListTemplate = ({ cards }: CardList) => {
  const { totalPages } = cards.page;
  const { seasons } = cards;

  return (
    <>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr className={styles.head_item}>
              <th className={styles.th}>Season name</th>
              <th>Season Description</th>
            </tr>
          </thead>
          <tbody>
            {seasons &&
              seasons.map((value) => {
                return <Card item={value} key={value.uid} />;
              })}
          </tbody>
        </table>
      </div>

      <Pagination totalPage={totalPages} />
    </>
  );
};
