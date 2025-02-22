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
import {
  detailsAdded,
  detailsRemoved,
  selectAllDetails,
} from '../../../../store/detailsSlice';
import { useEffect } from 'react';
import { getDetails } from '../../../../shared/utils/helpers';

interface Card {
  item: Seasons;
}

export const Card = ({ item }: Card) => {
  const dispatch = useAppDispatch();
  const checked = useAppSelector(selectAllChecked);
  const details = useAppSelector(selectAllDetails);
  const { data: season, isSuccess } = useGetCheckedDetailsQuery({
    uid: item.uid || '',
  });

  useEffect(() => {
    if (
      checked.includes(item.uid) &&
      isSuccess &&
      season?.season.uid === item.uid &&
      (!details.length || !details.find((val) => val.uid === item.uid))
    ) {
      const detailsData = getDetails(season);
      dispatch(detailsAdded(detailsData));
    }
  }, [checked, dispatch, season, item.uid, details, isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(cardAdded(item.uid));
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
