'use client';

import styles from './Card.module.css';
import { Seasons } from '../../models/types/api';
import { useAppDispatch, useAppSelector } from '../../store/withTypes';
import {
  cardAdded,
  cardRemoved,
  selectAllChecked,
} from '../../store/checkedSlice';
import { detailsAdded, detailsRemoved } from '../../store/detailsSlice';

import { uidChecked } from 'src/store/uidSlice';
import { useRouter, useSearchParams } from 'next/navigation';

interface Card {
  item: Seasons;
}

export const Card = ({ item }: Card) => {
  const dispatch = useAppDispatch();
  const checked = useAppSelector(selectAllChecked);
  const router = useRouter();
  const searchparams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(cardAdded(item.uid));
      dispatch(uidChecked(item.uid));
      dispatch(detailsAdded(item));
    } else {
      dispatch(cardRemoved(item.uid));
      dispatch(detailsRemoved(item.uid));
    }
  };
  return (
    <tr className={styles.card}>
      <td className={styles.card_item}>
        <div>
          <button
            onClick={() =>
              !searchparams.get('uid') &&
              router.push(`${location.search}&uid=${item.uid}`)
            }
          >
            {' '}
            {item.title}
          </button>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={checked.includes(item.uid)}
          />
        </div>
      </td>
      <td className={styles.card_item}>
        <span>number of episodes: </span>
        <span>{item.numberOfEpisodes}</span>
        <div>
          <span>season number: </span>
          <span>{item.seasonNumber}</span>
        </div>
        <div>
          <span>series title: </span>
          <span>{item.series.title}</span>
        </div>
      </td>
    </tr>
  );
};
