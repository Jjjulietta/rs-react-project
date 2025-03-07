import { Details } from 'src/components/Details/Details';
import { BASE_URL, URLS } from 'src/models/constants/constants';

const getDetails = async (uid: string) => {
  const url = new URL(`${BASE_URL}${URLS.GET}`);
  url.searchParams.set('uid', `${uid}`);

  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

type Props = {
  uid: string;
};

const DetailsPage = async ({ uid }: Props) => {
  console.log(uid);
  const details = await getDetails(uid);
  return <Details details={details} />;
};

export default DetailsPage;
