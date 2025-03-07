import styles from './Pagination.module.css';
import { uidCheckedRemoved } from 'src/store/uidSlice';
import { useAppDispatch } from 'src/store/withTypes';

export type PaginationProps = {
  setPage: (page: number) => void;
  currentPage: number;
  totalPage: number;
};

export const Pagination = (props: PaginationProps) => {
  const dispatch = useAppDispatch();
  const { setPage, currentPage, totalPage } = props;
  const handleClickNext = () => {
    if (currentPage < totalPage) {
      setPage(currentPage + 1);
      dispatch(uidCheckedRemoved(''));
    }
  };
  const handleClickPrev = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
      dispatch(uidCheckedRemoved(''));
    }
  };
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.arrow}
        onClick={handleClickPrev}
        disabled={currentPage === 1 ? true : false}
      >
        {'<'}
      </button>
      <div className={styles.container}>
        <div data-testid="currentPage" className={styles.container_el_active}>
          {currentPage}
        </div>
        <span>/</span>
        <div data-testid="totalPage" className={styles.container_el}>
          {totalPage}
        </div>
      </div>
      <button
        type="button"
        className={styles.arrow}
        onClick={handleClickNext}
        disabled={currentPage === totalPage ? true : false}
      >
        {'>'}
      </button>
    </div>
  );
};
