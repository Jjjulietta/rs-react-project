import { memo, useState } from 'react';
import { Country } from '../../../models/types';
import styles from './card.module.css';

interface Card {
  card: Country;
}

export const Card = memo((card: Card) => {
  const { name, population, region, flag } = card.card;
  const [style, setStyle] = useState(Boolean(localStorage.getItem(`${name}`)));
  const handleClick = () => {
    localStorage.setItem(`${name}`, `${name}`);
    setStyle(true);
  };
  return (
    <tr className={style ? styles.card_active : styles.card}>
      <td className={styles.card_item} onClick={handleClick}>
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
});

Card.displayName = 'Card';
