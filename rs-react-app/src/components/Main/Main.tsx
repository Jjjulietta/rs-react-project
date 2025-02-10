import { useEffect, useState } from 'react';
import { Search } from '../Search/Search';
import { CardList } from '../CardList/CardList';
import HttpService from '../../services/http.service';
import {
  FIRST_PAGE,
  PAGE_SIZE,
  PAGINATION_DEFAULT,
  URLS,
} from '../../utils/constants';
import { PaginationI, Seasons, Statuses } from '../../types/apiTypes';
import styles from './Main.module.css';
import { Button } from '../Button/Button';
import { AxiosError } from 'axios';
import { Pagination } from '../Pagination/Pagination';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';

export const Main = () => {
  const [value, setValue] = useState<string | null | undefined>(null);
  const [items, setItems] = useState<Seasons[] | []>([]);
  const [, setSearchParam] = useSearchParams();
  const [paginationState, setPaginationState] =
    useState<PaginationI>(PAGINATION_DEFAULT);
  const [currentPage, setCurrentPage] = useState(PAGINATION_DEFAULT.pageNumber);
  const [error, setError] = useState<string | undefined>();
  const [errorStatus, setErrorStatus] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const httpService = new HttpService();
  const updateValue = (val: string) => {
    setValue(val);
    getSearchValue(val, FIRST_PAGE, PAGE_SIZE);
  };

  const closeDetails = () => {
    if (params.uid) {
      navigate(`/${location.search}`);
    }
  };

  const getData = (pageNumber?: number, pageSize?: number) => {
    setIsLoading(true);
    httpService
      .getPagination(URLS.PAGINATION, { pageNumber, pageSize })
      .then((data) => {
        setItems(data.seasons);
        setPaginationState(data.page);
      })
      .catch((e: AxiosError) => {
        if (
          e.status &&
          (e.status >= Statuses.ErrorClient || e.status >= Statuses.ErrorServer)
        ) {
          setErrorStatus(e.message);
        } else {
          setError(e.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const getSearchValue = (
    value: string,
    pageNumber: number,
    pageSize: number
  ) => {
    setIsLoading(true);
    httpService
      .SearchData(
        URLS.SEARCH,
        value,
        { pageNumber, pageSize },
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      )
      .then((data) => {
        console.log(data);
        setItems(data.data?.seasons);
        setPaginationState(data.data.page);
      })
      .catch((e: AxiosError) => {
        if (
          e.status &&
          (e.status >= Statuses.ErrorClient || e.status >= Statuses.ErrorServer)
        ) {
          setErrorStatus(e.message);
        } else {
          setError(e.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleClick = () => {
    setError('Error!');
  };

  useEffect(() => {
    console.log(currentPage);
    setSearchParam({ search: `${value}`, page: `${currentPage}` });
    if (value) {
      getSearchValue(value, currentPage - 1, PAGE_SIZE);
    } else {
      getData(currentPage - 1, PAGE_SIZE);
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className={params.uid ? styles.layout : ''} onClick={closeDetails}>
      <div className={params.uid ? styles.search_details : styles.search}>
        <Search onSearch={updateValue} />
        <CardList items={items} error={errorStatus} isLoading={isLoading} />
        <Button
          type="button"
          className={styles.btn_error}
          onClick={handleClick}
          name="error button"
        />
        {items.length && (
          <Pagination
            totalPage={paginationState.totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};
