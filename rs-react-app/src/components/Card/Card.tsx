import styles from './Card.module.css';
import { Seasons } from '../../models/types/api';
import { useAppDispatch, useAppSelector } from '../../store/withTypes';
import {
  cardAdded,
  cardRemoved,
  selectAllChecked,
} from '../../store/checkedSlice';
import { detailsRemoved } from '../../store/detailsSlice';
import { useRouter } from 'next/compat/router';
import { uidChecked } from 'src/store/uidSlice';

interface Card {
  item: Seasons;
}

export const Card = ({ item }: Card) => {
  const dispatch = useAppDispatch();
  const checked = useAppSelector(selectAllChecked);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(cardAdded(item.uid));
      dispatch(uidChecked(item.uid));
    } else {
      dispatch(cardRemoved(item.uid));
      dispatch(detailsRemoved(item.uid));
    }
  };
  return (
    <tr className={styles.card}>
      <td className={styles.card_item}>
        <button
          onClick={() =>
            !router.query.uid &&
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
