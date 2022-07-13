import { NextPage } from 'next';

import ErrorPage from './_error';

const PageNotFound: NextPage = () => {
  return (
    <ErrorPage message='Page Not Found' statusCode={404} />
  )
};

export default PageNotFound;