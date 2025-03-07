import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import { Search } from '../Search/Search';
import { CardList } from '../CardList/CardList';
import { useSearchParams } from 'next/navigation';
import {
  SEARCH_VALUE,
  PAGINATION_DEFAULT,
} from 'src/models/constants/constants';
import {
  Seasons,
  PaginationI,
  AllSeasonSearch,
  SeasonDetails,
  SeasonType,
} from 'src/models/types/api';
import { selectCheckedNumber } from 'src/store/checkedSlice';
import { useAppDispatch, useAppSelector } from 'src/store/withTypes';
import { useLocalStorage } from 'src/utils/hooksLS';
import { Flayout } from '../Flayout/Flayout';
import { Pagination } from '../Pagination/Pagination';
import { SwitchButton } from '../SwitchButton/SwitchButton';
import { useRouter } from 'next/compat/router';
import { detailsAdded } from 'src/store/detailsSlice';
import { selectUId } from 'src/store/uidSlice';
import { Details } from '../Details/Details';

interface Main {
  details: SeasonDetails;
  cards: AllSeasonSearch;
  detailsPage: SeasonType;
}

export const Main = (details: Main) => {
  const [search] = useLocalStorage(SEARCH_VALUE);
  const [value, setValue] = useState<string | null | undefined>(search);
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Seasons[] | []>([]);
  const searchParams = useSearchParams();
  const checkedNumbers = useAppSelector(selectCheckedNumber);
  const checkedUid = useAppSelector(selectUId);
  const [isVisible, setIsVisible] = useState(false);
  const [paginationState, setPaginationState] =
    useState<PaginationI>(PAGINATION_DEFAULT);
  const [currentPage, setCurrentPage] = useState(PAGINATION_DEFAULT.pageNumber);
  const [errorStatus] = useState<string | undefined>();
  const router = useRouter();
  const { uid } = router?.query || undefined;

  useEffect(() => {
    if (details.details.uid) {
      dispatch(detailsAdded(details.details));
    }
  }, [dispatch, details]);

  useEffect(() => {
    if (!value) {
      setValue(search);
    }
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('search', `${value}`);
    newSearchParams.set('page', `${currentPage}`);
    newSearchParams.set('checked', `${checkedUid}`);
    router.push(router.pathname + '?' + newSearchParams);
  }, [currentPage, value, checkedUid, search]);

  useEffect(() => {
    if (checkedNumbers && checkedNumbers !== 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [checkedNumbers]);

  const updateValue = (val: string) => {
    setValue(val);
  };

  const closeDetails = () => {
    if (uid) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('uid');
      router.replace(router.pathname + '?' + newSearchParams);
    }
  };

  useEffect(() => {
    if (details.cards) {
      setItems(details.cards.seasons);
      setPaginationState(details.cards.page);
    }
  }, [details]);

  return (
    <div className={uid ? styles.layout : ''} onClick={closeDetails}>
      <div className={uid ? styles.search_details : styles.search}>
        <SwitchButton />
        <Search onSearch={updateValue} />
        <CardList items={items} error={errorStatus} isLoading={false} />
        {items && items.length && (
          <Pagination
            totalPage={paginationState.totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
      </div>
      {isVisible && <Flayout />}
      {uid && <Details details={details.detailsPage} />}
    </div>
  );
};
