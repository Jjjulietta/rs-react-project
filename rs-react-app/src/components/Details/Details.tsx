import { useNavigate, useParams } from 'react-router';
import styles from './Details.module.css';
import { useEffect, useState } from 'react';
import {
  EpisodeDetails,
  SeasonDetails,
  SeriesDetails,
  Statuses,
} from '../../types/apiTypes';
import HttpService from '../../services/http.service';
import { URLS } from '../../utils/constants';
import { AxiosError } from 'axios';
import { Loader } from '../Loader/Loader';
import { stringTransform } from '../../utils/helpers';
import { Button } from '../Button/Button';

export const Details = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<SeasonDetails | undefined>();
  const [errorStatus, setErrorStatus] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    navigate(`/${location.search}`);
  };

  useEffect(() => {
    const httpService = new HttpService();

    const getDetails = (uid: string) => {
      setIsLoading(true);
      httpService
        .getSeason(URLS.GET, { uid })
        .then((data) => {
          setDetails(data);
        })
        .catch((e: AxiosError) => {
          if (
            e.status &&
            (e.status >= Statuses.ErrorClient ||
              e.status >= Statuses.ErrorServer)
          ) {
            setErrorStatus(e.message);
          } else {
            setError(e.message);
          }
        })
        .finally(() => setIsLoading(false));
    };

    getDetails(uid?.slice(1) || '');
  }, [uid]);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

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
      {errorStatus ? (
        <div className={styles.error_template}>{errorStatus}</div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className={styles.title}>{details?.title}</h2>
          <h3>series</h3>
          <div>{details?.series && template(details?.series)}</div>
        </>
      )}
    </div>
  );
};
