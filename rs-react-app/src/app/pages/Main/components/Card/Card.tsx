import styles from './Card.module.css';
import { Seasons } from '../../../../models/types/api';
import { NavLink } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../store/withTypes';
import {
  cardAdded,
  cardRemoved,
  selectAllChecked,
} from '../../../../store/checkedSlice';
import { useGetCheckedDetailsQuery } from '../../../../store/apiSlice';
import { detailsAdded, detailsRemoved } from '../../../../store/detailsSlice';
import { getDetails } from '../../../../shared/utils/helpers';

interface Card {
  item: Seasons;
}

export const Card = ({ item }: Card) => {
  const dispatch = useAppDispatch();
  const checked = useAppSelector(selectAllChecked);
  const { data: season } = useGetCheckedDetailsQuery({
    uid: item.uid || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && season) {
      dispatch(cardAdded(item.uid));
      const detailsData = getDetails(season);
      dispatch(detailsAdded(detailsData));
    } else {
      dispatch(cardRemoved(item.uid));
      dispatch(detailsRemoved(item.uid));
    }
  };
  return (
    <tr className={styles.card}>
      <td className={styles.card_item}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={`/details/:${item.uid}/${location.search}`}
        >
          {item.title}
        </NavLink>
        <input
          type="checkbox"
          onChange={handleChange}
          // defaultChecked={checked.includes(item.uid)}
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
