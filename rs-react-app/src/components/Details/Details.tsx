import styles from './Details.module.css';
import {
  EpisodeDetails,
  SeasonType,
  SeriesDetails,
} from '../../models/types/api';
import { getDetailsSeries, stringTransform } from '../../utils/helpers';
import { Button } from '../Button/Button';
import { useRouter } from 'next/compat/router';
import { useSearchParams } from 'next/navigation';

interface Details {
  details: SeasonType;
}

export const Details = (details: Details) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('uid');
    router.replace(router.pathname + '?' + newSearchParams);
  };

  const template = (obj: SeriesDetails | EpisodeDetails) => {
    const arr = Object.entries(obj);

    return (
      <div className={styles.details}>
        {arr.map((item, index) => (
          <li className={styles.item_details} key={index}>
            <span className={styles.item_name}>
              {stringTransform(item[0])}:
            </span>
            <span className={styles.item_descr}>{item[1]}</span>
          </li>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.layout} data-testid="details">
      <Button
        className={styles.btn}
        type={'button'}
        name={'close details'}
        onClick={handleClick}
      />
      <>
        {details.details && (
          <div>
            <h2 className={styles.title}>{details.details.season?.title}</h2>
            <h3>series</h3>
            <div>
              {details.details.season.uid &&
                template(getDetailsSeries(details.details).series)}
            </div>
          </div>
        )}
      </>
    </div>
  );
};
