import { useEffect, useState } from 'react';
import { Search } from '../shared/components/search/Search';
import { Filters } from '../shared/components/filters/Filters';
import { CardListTemplate } from '../shared/components/cardList/CardList';
import { Country } from '../models/types';
import {
  filteredByRegions,
  getRegionsList,
  orderBy,
  searchedCountry,
} from '../shared/utils/helpers';
import { Sort } from '../shared/components/sort/Sort';
import { getCountryes } from '../services/api';

export const Main = () => {
  const [, setValue] = useState<string | null | undefined>(null);
  const [order, setOrder] = useState<string | null | undefined>(null);
  const [orderField, setOrderField] = useState<string | null | undefined>(null);
  const [countries, setCountries] = useState<Country[] | []>([]);
  const [countriesResult, setCountriesResult] = useState<Country[] | []>([]);
  const [regions, setRegions] = useState<string[] | []>([]);
  const [region, setRegion] = useState<string | null>(null);

  useEffect(() => {
    getCountryes().then((data) => {
      const countries = data.map((item) => {
        const val = { ...item, name: item.name.common };
        return val;
      });
      setCountries(countries);
      setCountriesResult(countries);
      const regionsList = getRegionsList(countries);
      setRegions(regionsList);
    });
  }, []);

  const searchValue = (val: string) => {
    setValue(val);
    const country = searchedCountry(val, countries);
    setCountriesResult(country);
  };
  const selectRegion = (value: string) => {
    setRegion(value);
    if (order && orderField) {
      const sortedCountries = orderBy(order, orderField, countries);
      const filtered = filteredByRegions(value, sortedCountries);
      setCountriesResult(filtered);
    } else {
      const filtered = filteredByRegions(value, countries);

      setCountriesResult(filtered || []);
    }
  };

  const selectOrder = (
    order: string | null | undefined,
    field: string | null | undefined
  ) => {
    setOrder(order);
    setOrderField(field);
    if (order && field) {
      const sortedCountries = orderBy(order, field, countriesResult);
      setCountriesResult(sortedCountries);
    } else if (
      ((!order && !field) || (order && !field) || (!order && field)) &&
      region
    ) {
      const filtered = filteredByRegions(region, countries);
      setCountriesResult(filtered || []);
    } else {
      setCountriesResult(countries);
    }
  };

  return (
    <div>
      <Search onSearch={searchValue} />
      <Filters regions={regions} setRegion={selectRegion} />
      <Sort setOrder={selectOrder} />
      <CardListTemplate list={countriesResult} />
    </div>
  );
};
