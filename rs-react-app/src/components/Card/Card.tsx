import styles from './Card.module.css';
import { Seasons } from '../../types/apiTypes';
import { NavLink } from 'react-router';

interface CardI {
  item: Seasons;
}

export const Card = ({ item }: CardI) => {
  return (
    <tr className={styles.card}>
      <td className={styles.card_item}>
        <NavLink to={`/details/:${item.uid}`}>{item.title}</NavLink>
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
