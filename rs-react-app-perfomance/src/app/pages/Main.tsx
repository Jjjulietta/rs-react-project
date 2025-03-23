import { useCallback, useEffect, useState } from 'react';
import { Search } from '../shared/components/search/Search';
import { Filters } from '../shared/components/filters/Filters';
import { CardListTemplate } from '../shared/components/cardList/CardList';
import { Country } from '../models/types';
import { Sort } from '../shared/components/sort/Sort';
import { getCountryes } from '../services/api';
import { getRegionsList } from '../shared/utils/helpers';

export const Main = () => {
  const [value, setValue] = useState<string>('');
  const [order, setOrder] = useState<string | undefined>();
  const [orderField, setOrderField] = useState<string | undefined>();
  const [countries, setCountries] = useState<Country[] | []>([]);
  const [regions, setRegions] = useState<string[] | []>([]);
  const [region, setRegion] = useState<string>('all');

  useEffect(() => {
    getCountryes().then((data) => {
      const countries = data.map((item) => {
        const val = { ...item, name: item.name.common };
        return val;
      });
      setCountries(countries);
      const regionsList = getRegionsList(countries);
      setRegions(regionsList);
    });
  }, []);

  const searchValue = useCallback((val: string) => {
    setValue(val);
  }, []);

  const selectRegion = useCallback((value: string) => {
    setValue('');
    setRegion(value);
  }, []);

  const selectOrder = useCallback(
    (order: string | undefined, field: string | undefined) => {
      setOrder(order);
      setOrderField(field);
    },
    []
  );

  return (
    <div>
      <Search onSearch={searchValue} />
      <Filters regions={regions} setRegion={selectRegion} />
      <Sort setOrder={selectOrder} />
      <CardListTemplate
        list={countries}
        searchValue={value}
        region={region}
        order={order}
        orderField={orderField}
      />
    </div>
  );
};
