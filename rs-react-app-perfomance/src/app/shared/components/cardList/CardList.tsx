import { FiltersArray } from '../../../models/constants';
import { Country } from '../../../models/types';
import { Card } from '../card/Card';
import styles from './cardList.module.css';

interface CardList {
  list: Country[];
}

export const CardListTemplate = ({ list }: CardList) => {
  return (
    <>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr className={styles.head_item}>
              {FiltersArray.map((item, i) => (
                <th key={i} className={styles.th}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((value) => {
                return <Card card={value} key={value.flag} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
