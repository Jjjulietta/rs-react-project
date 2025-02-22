import {
  removedAll,
  selectCheckedNumber,
} from '../../../../store/checkedSlice';
import {
  removedAllDetails,
  selectAllDetails,
} from '../../../../store/detailsSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/withTypes';
import { convertToCSV } from '../../../../shared/utils/helpers';
import { Button } from '../../../../shared/components/Button/Button';
import styles from './Flayout.module.css';

export const Flayout = () => {
  const checkedNumber = useAppSelector(selectCheckedNumber);
  const detailsData = useAppSelector(selectAllDetails);
  const series = detailsData.map((item) => item.series);
  const dispatch = useAppDispatch();
  const unselectAll = () => {
    dispatch(removedAll([]));
    dispatch(removedAllDetails([]));
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.btn}
        type="button"
        name="Unselect all"
        onClick={unselectAll}
      />
      <div data-testid="checkedNumber" className={styles.text}>
        {checkedNumber} items are selected
      </div>
      <a
        href={series ? convertToCSV(series) : '/'}
        download={`${checkedNumber}_seasons.csv`}
      >
        <Button className={styles.btn} type="button" name="Download" />
      </a>
    </div>
  );
};
