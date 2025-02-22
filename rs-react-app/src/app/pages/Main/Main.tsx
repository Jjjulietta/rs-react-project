import { useEffect, useState } from 'react';
import { Search } from './components/Search/Search.tsx';
import { CardList } from './components/CardList/CardList.tsx';
import {
  PAGE_SIZE,
  PAGINATION_DEFAULT,
  SEARCH_VALUE,
} from '../../models/constants/constants.ts';
import { PaginationI, Seasons } from '../../models/types/api.ts';
import styles from './Main.module.css';
import { Pagination } from '../../shared/components/Pagination/Pagination.tsx';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import { Flayout } from './components/Flayout/Flayout.tsx';
import { SwitchButton } from './components/SwitchButton/SwitchButton.tsx';
import { useLocalStorage } from '../../shared/utils/hooksLS.tsx';
import { useAppSelector } from '../../store/withTypes.ts';
import { useGetSearchCardsQuery } from '../../store/apiSlice.tsx';
import { selectCheckedNumber } from '../../store/checkedSlice.tsx';

export const Main = () => {
  const [search] = useLocalStorage(SEARCH_VALUE, '');
  const [value, setValue] = useState<string | null | undefined>(search);
  const [items, setItems] = useState<Seasons[] | []>([]);
  const [, setSearchParam] = useSearchParams();
  const [paginationState, setPaginationState] =
    useState<PaginationI>(PAGINATION_DEFAULT);
  const [currentPage, setCurrentPage] = useState(PAGINATION_DEFAULT.pageNumber);
  const [errorStatus, setErrorStatus] = useState<string | undefined>();
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: searchCards,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSearchCardsQuery({
    title: value || '',
    params: {
      pageNumber: currentPage - 1,
      pageSize: PAGE_SIZE,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const checkedNumber = useAppSelector(selectCheckedNumber);

  const updateValue = (val: string) => {
    setValue(val);
  };

  const closeDetails = () => {
    if (params.uid) {
      navigate(`/${location.search}`);
    }
  };

  useEffect(() => {
    setSearchParam({ search: `${value}`, page: `${currentPage}` });

    if (isSuccess && searchCards) {
      setItems(searchCards?.seasons);
      setPaginationState(searchCards.page);
    }
    if (error) {
      if ('status' in error) {
        const errorMes =
          'error' in error ? error.error : JSON.stringify(error.data);
        setErrorStatus(errorMes);
      } else {
        setErrorStatus(error.message);
      }
    }
  }, [
    currentPage,
    isSuccess,
    searchCards,
    setSearchParam,
    value,
    isError,
    error,
  ]);

  return (
    <div className={params.uid ? styles.layout : ''} onClick={closeDetails}>
      <div className={params.uid ? styles.search_details : styles.search}>
        <SwitchButton />
        <Search onSearch={updateValue} />
        <CardList items={items} error={errorStatus} isLoading={isFetching} />
        {items.length && (
          <Pagination
            totalPage={paginationState.totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        {checkedNumber && <Flayout />}
      </div>

      <Outlet />
    </div>
  );
};
