import { useNavigate, useParams } from 'react-router';
import styles from './Details.module.css';
import { useEffect, useState } from 'react';
import { EpisodeDetails, SeriesDetails } from '../../models/types/apiTypes';
import { Loader } from '../../shared/components/Loader/Loader';
import { getDetails, stringTransform } from '../../shared/utils/helpers';
import { Button } from '../../shared/components/Button/Button';
import { useGetDetailsQuery } from '../../store/apiSlice';

export const Details = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  // const [details, setDetails] = useState<SeasonDetails | undefined>();
  const [errorStatus, setErrorStatus] = useState<string | undefined>();
  const {
    data: season,
    isSuccess,
    isFetching,
    error,
  } = useGetDetailsQuery({
    uid: uid?.slice(1) || '',
  });

  const handleClick = () => {
    navigate(`/${location.search}`);
  };

  useEffect(() => {
    if (error) {
      if ('status' in error) {
        const errorMes =
          'error' in error ? error.error : JSON.stringify(error.data);
        setErrorStatus(errorMes);
      } else {
        setErrorStatus(error.message);
      }
    }
  }, [error]);

  const template = (obj: SeriesDetails | EpisodeDetails) => {
    const arr = Object.entries(obj);
    if (isSuccess) {
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
    }
  };

  return (
    <div className={styles.layout} data-testid="details">
      <Button
        className={styles.btn}
        type={'button'}
        name={'close details'}
        onClick={handleClick}
      />
      {errorStatus ? (
        <div className={styles.error_template}>{errorStatus}</div>
      ) : isFetching ? (
        <Loader />
      ) : (
        <>
          <h2 className={styles.title}>{season?.season.title}</h2>
          <h3>series</h3>
          <div>{season && template(getDetails(season).series)}</div>
        </>
      )}
    </div>
  );
};
