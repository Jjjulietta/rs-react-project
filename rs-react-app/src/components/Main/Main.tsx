'use client';

import { useEffect, useState } from 'react';
import styles from './Main.module.css';
import { Search } from '../Search/Search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SEARCH_VALUE } from 'src/models/constants/constants';
import { selectCheckedNumber } from 'src/store/checkedSlice';
import { useAppSelector } from 'src/store/withTypes';
import { useLocalStorage } from 'src/utils/hooksLS';
import { Flayout } from '../Flayout/Flayout';
import { SwitchButton } from '../SwitchButton/SwitchButton';
import { usePagination } from 'src/context/paginationContext';

export const Main = () => {
  const [search] = useLocalStorage(SEARCH_VALUE, '');
  const [value, setValue] = useState<string | null | undefined>('');
  const { currentPage } = usePagination();
  const searchParams = useSearchParams();
  const checkedNumbers = useAppSelector(selectCheckedNumber);

  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const uid = searchParams.get('uid') || undefined;
  const pathname = usePathname();

  useEffect(() => {
    setValue(search);
  }, [search]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('search', `${value}`);
    newSearchParams.set('page', `${currentPage}`);
    router.push(pathname + '?' + newSearchParams);
  }, [value, currentPage]);

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
      router.replace(pathname + '?' + newSearchParams);
    }
  };

  return (
    <div onClick={closeDetails}>
      <div className={uid ? styles.search_details : styles.search}>
        <SwitchButton />
        <Search onSearch={updateValue} />
      </div>
      {isVisible && <Flayout />}
    </div>
  );
};
