import { Component } from 'react';
import styles from './Card.module.css';
import { Seasons } from '../../types/apiTypes';

interface CardI {
  item: Seasons;
}

export default class Card extends Component<CardI> {
  render() {
    return (
      <tr className={styles.card}>
        <td className={styles.card_item}>{this.props.item.title}</td>
        <td className={styles.card_item}>
          <span>number of episodes: </span>
          <span>{this.props.item.numberOfEpisodes}</span>
          <div>
            <span>season number: </span>
            <span>{this.props.item.seasonNumber}</span>
          </div>
          <div>
            <span>series title: </span>
            <span>{this.props.item.series.title}</span>
          </div>
        </td>
      </tr>
    );
  }
}
