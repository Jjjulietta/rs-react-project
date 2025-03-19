import { Country } from '../../../models/types';
import styles from './card.module.css';

interface Card {
  card: Country;
}

export const Card = (card: Card) => {
  const { name, population, region, flag } = card.card;
  return (
    <tr className={styles.card}>
      <td className={styles.card_item}>
        <span>{name}</span>
      </td>
      <td className={styles.card_item}>
        <span>{region}</span>
      </td>
      <td className={styles.card_item}>
        <span>{population}</span>
      </td>
      <td className={styles.card_item}>
        <span>{flag}</span>
      </td>
    </tr>
  );
};
