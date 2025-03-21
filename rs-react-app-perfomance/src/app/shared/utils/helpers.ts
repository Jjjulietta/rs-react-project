import { Order, SORT_FIELDS } from '../../models/constants';
import { Country } from '../../models/types';

export const getRegionsList = (countries: Country[]) => {
  const set = new Set<string>();
  countries.forEach((item) => set.add(item.region));
  const list: string[] = Array.from(set);
  list.unshift('all');
  return list;
};

export const orderBy = (
  order: string | null | undefined,
  fields: string | null | undefined,
  countries: Country[]
) => {
  const sortedCountries = [...countries];
  if (fields === SORT_FIELDS.NAME) {
    return order === Order.DESC
      ? sortedCountries.sort((a, b) => b.name.localeCompare(a.name))
      : sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
  } else if (fields === SORT_FIELDS.POPULATION) {
    return order === Order.DESC
      ? sortedCountries.sort((a, b) => b.population - a.population)
      : sortedCountries.sort((a, b) => a.population - b.population);
  }

  return sortedCountries;
};

export const filteredByRegions = (value: string, countries: Country[]) => {
  if (value === 'all') {
    return countries;
  }
  const filter = countries.filter((country) => country.region === value);
  return filter;
};

export const searchedCountry = (
  search: string | undefined,
  countries: Country[]
) => {
  if (search) {
    return countries.filter(({ name }) =>
      name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return countries;
};
