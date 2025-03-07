import Layout from 'src/components/layout';
import { Main } from 'src/components/Main/Main';
import { PAGE_SIZE } from 'src/models/constants/constants';
import {
  AllSeasonSearch,
  SearchParams,
  SeasonDetails,
  SeasonType,
} from 'src/models/types/api';
import {
  getCheckedDetails,
  getDetails,
  getSearchCards,
} from 'src/store/apiSlice';
import { wrapper } from 'src/store/store';
import { getDetailsSeries } from 'src/utils/helpers';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const search = context.query?.search || '';
    const page = context.query?.page;
    const uid = context.query?.uid;
    const uidChecked = context.query?.checked;
    let details = {};
    let cards = {};
    let detailsPage = {};
    if (page && typeof page === 'string' && typeof search === 'string') {
      const params: SearchParams = {
        title: search,
        params: { pageNumber: +page - 1, pageSize: PAGE_SIZE },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      };
      const data = await store.dispatch(getSearchCards.initiate(params));
      cards = data.data;
    }

    if (uidChecked && typeof uidChecked === 'string' && uidChecked.length) {
      const params = { uid: uidChecked };
      const result = await store.dispatch(getCheckedDetails.initiate(params));
      details = getDetailsSeries(result.data);
    }

    if (uid && typeof uid === 'string') {
      const data = await store.dispatch(getDetails.initiate({ uid: uid }));
      detailsPage = data.data;
    }
    return { props: { details, cards, detailsPage } };
  }
);

export default function Index(details: {
  details: SeasonDetails;
  cards: AllSeasonSearch;
  detailsPage: SeasonType;
}) {
  return (
    <Layout>
      <Main
        details={details.details}
        cards={details.cards}
        detailsPage={details.detailsPage}
      />
    </Layout>
  );
}
