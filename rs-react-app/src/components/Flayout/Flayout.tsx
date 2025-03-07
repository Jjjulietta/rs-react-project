import { useRouter } from 'next/compat/router';
import { removedAll, selectCheckedNumber } from '../../store/checkedSlice';
import { removedAllDetails, selectAllDetails } from '../../store/detailsSlice';
import { useAppDispatch, useAppSelector } from '../../store/withTypes';
import { convertToCSV } from '../../utils/helpers';
import { Button } from '../Button/Button';
import styles from './Flayout.module.css';
import { useSearchParams } from 'next/navigation';

export const Flayout = () => {
  const checkedNumber = useAppSelector(selectCheckedNumber);
  const detailsData = useAppSelector(selectAllDetails);
  const searchParams = useSearchParams();
  const router = useRouter();
  const series = detailsData.map((item) => item.series);
  const dispatch = useAppDispatch();
  const unselectAll = () => {
    dispatch(removedAll([]));
    dispatch(removedAllDetails([]));
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('checked', '');
    router.replace(router.pathname + '?' + newSearchParams);
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.btn}
        type="button"
        name="Unselect all"
        onClick={unselectAll}
      />

      <span data-testid="checkedNumber" className={styles.text}>
        {checkedNumber}
      </span>
      <span>items are selected</span>

      <a
        href={series ? convertToCSV(series) : '/'}
        download={`${checkedNumber}_seasons.csv`}
      >
        <Button className={styles.btn} type="button" name="Download" />
      </a>
    </div>
  );
};
