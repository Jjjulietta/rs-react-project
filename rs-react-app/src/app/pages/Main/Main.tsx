import { useEffect, useState } from 'react';
import { Search } from './components/Search/Search.tsx';
import { CardList } from './components/CardList/CardList.tsx';
import {
  PAGE_SIZE,
  PAGINATION_DEFAULT,
  SEARCH_VALUE,
} from '../../models/constants/constants.ts';
import { PaginationI, Seasons } from '../../models/types/apiTypes.ts';
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
  // const [error, setError] = useState<string | undefined>();
  const [errorStatus, setErrorStatus] = useState<string | undefined>();
  // const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const {
  //   data: cards,
  //   isSuccess,
  //   isLoading,
  //   isError,
  // } = useGetCardsQuery({
  //   pageNumber: currentPage - 1,
  //   pageSize: PAGE_SIZE,
  // });
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

  // useEffect(() => {
  //   if (error) {
  //     throw error;
  //   }
  // }, [error]);

  // const httpService = new HttpService();
  const updateValue = (val: string) => {
    console.log(val);
    setValue(val);
    // getSearchValue(val, FIRST_PAGE, PAGE_SIZE);
  };

  const closeDetails = () => {
    if (params.uid) {
      navigate(`/${location.search}`);
    }
  };

  // const getData = (pageNumber: number, pageSize: number) => {
  //   setIsLoading(true);
  //   dispatch(loadCards({ pageNumber, pageSize }))
  //     .unwrap()
  //     .then((data) => console.log(data));
  //   httpService
  //     .getPagination(URLS.PAGINATION, { pageNumber, pageSize })
  //     .then((data) => {
  //       setItems(data.seasons);
  //       setPaginationState(data.page);
  //     })
  //     .catch((e: AxiosError) => {
  //       if (
  //         e.status &&
  //         (e.status >= Statuses.ErrorClient || e.status >= Statuses.ErrorServer)
  //       ) {
  //         setErrorStatus(e.message);
  //       } else {
  //         setError(e.message);
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  // const getSearchValue = (
  //   value: string,
  //   pageNumber: number,
  //   pageSize: number
  // ) => {
  //   setIsLoading(true);
  //   httpService
  //     .SearchData(
  //       URLS.SEARCH,
  //       value,
  //       { pageNumber, pageSize },
  //       {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       }
  //     )
  //     .then((data) => {
  //       console.log(data);
  //       setItems(data.data?.seasons);
  //       setPaginationState(data.data.page);
  //     })
  //     .catch((e: AxiosError) => {
  //       if (
  //         e.status &&
  //         (e.status >= Statuses.ErrorClient || e.status >= Statuses.ErrorServer)
  //       ) {
  //         setErrorStatus(e.message);
  //       } else {
  //         setError(e.message);
  //       }
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  // const handleClick = () => {
  //   setError('Error!');
  // };

  useEffect(() => {
    setSearchParam({ search: `${value}`, page: `${currentPage}` });

    if (isSuccess && searchCards) {
      console.log(searchCards?.seasons);
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
    // if (value) {
    //   console.log(value);
    //   // getSearchValue(value, currentPage - 1, PAGE_SIZE);
    //   if (isSuccess && searchCards) {
    //     console.log(searchCards?.seasons);
    //     setItems(searchCards?.seasons);
    //     setPaginationState(searchCards.page);
    //   }
    // } else if (isSuccess && cards) {
    //   console.log(cards?.seasons);
    //   setItems(cards?.seasons);
    //   setPaginationState(cards.page);
    //   // getData(currentPage - 1, PAGE_SIZE);
    // }
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
        {/* <Button
          type="button"
          className={styles.btn_error}
          onClick={handleClick}
          name="error button"
        /> */}
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
