import { useMemo } from 'react';
import { FiltersArray } from '../../../models/constants';
import { Country } from '../../../models/types';
import { Card } from '../card/Card';
import styles from './cardList.module.css';
import {
  searchedCountry,
  filteredByRegions,
  orderBy,
} from '../../utils/helpers';

interface CardList {
  list: Country[];
  searchValue?: string;
  region: string;
  order?: string;
  orderField?: string;
}

export const CardListTemplate = ({
  list,
  region,
  searchValue,
  order,
  orderField,
}: CardList) => {
  const searched = useMemo(
    () => searchedCountry(searchValue, list),
    [list, searchValue]
  );
  const filtered = useMemo(
    () => filteredByRegions(region, list),

    [list, region]
  );
  const sorted = useMemo(
    () => orderBy(order, orderField, filtered),
    [filtered, order, orderField]
  );
  const countries = useMemo(() => {
    if (searchValue) {
      return searched;
    }
    if (order && orderField) {
      return sorted;
    }
    return filtered;
  }, [filtered, order, orderField, searchValue, searched, sorted]);

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
            {countries &&
              countries.map((value) => <Card card={value} key={value.flag} />)}
          </tbody>
        </table>
      </div>
    </>
  );
};
