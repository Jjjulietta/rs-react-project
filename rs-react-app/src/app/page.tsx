import { CardListTemplate } from 'src/components/CardList/CardListTemplate';
import DetailsPage from 'src/components/Details/DetailsPage';
import { Main } from 'src/components/Main/Main';
import { BASE_URL, URLS, PAGE_SIZE } from 'src/models/constants/constants';
import { AllSeasonSearch } from 'src/models/types/api';

interface SearchCards {
  page: number;
  search?: string;
}

const getCards = async ({ page, search }: SearchCards) => {
  const url = new URL(`${BASE_URL}${URLS.PAGINATION}`);
  url.searchParams.set('pageNumber', `${page}`);
  url.searchParams.set('pageSize', `${PAGE_SIZE}`);
  url.searchParams.set('title', `${search}`);
  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data: Promise<AllSeasonSearch> = response.json();
  return data;
};

const getSearchCards = async ({ page, search }: SearchCards) => {
  const url = new URL(`${BASE_URL}${URLS.SEARCH}`);
  url.searchParams.set('pageNumber', `${page}`);
  url.searchParams.set('pageSize', `${PAGE_SIZE}`);
  url.searchParams.set('title', `${search}`);
  const response = await fetch(url.href, { method: 'POST' });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data: Promise<AllSeasonSearch> = response.json();
  return data;
};

export default async function CardList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let cards: AllSeasonSearch;
  const { search, page, uid } = await searchParams;

  if (!page) {
    cards = await getCards({ page: 0 });
  } else if (page && typeof page === 'string' && !search) {
    cards = await getCards({ page: +page - 1 });
  } else if (
    page &&
    typeof page === 'string' &&
    search &&
    typeof search === 'string'
  ) {
    cards = await getSearchCards({ page: +page - 1, search: search });
  }
  return (
    <section>
      <Main />
      <div className={uid ? 'layout' : ''}>
        <div>
          <h2>Star Trek Seasons - Results</h2>
          <CardListTemplate cards={cards} />
        </div>
        {uid && typeof uid === 'string' && <DetailsPage uid={uid} />}
      </div>
    </section>
  );
}
