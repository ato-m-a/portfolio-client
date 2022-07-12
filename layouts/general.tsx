import { ReactNode, ReactElement, Fragment } from 'react';

type AppProps = {
  children: ReactNode;
};

/* components */
import GeneralHeader from '../components/layouts/header';
import Docker from '../components/layouts/docker';

/* styles */
import styles from '../styles/home.module.scss';

const GeneralLayout = ({ children }: AppProps): ReactElement => {
  return (
    <Fragment>
      <GeneralHeader />
      <main className={styles.home}>
        {children}
      </main>
      <Docker />
    </Fragment>
  )
};

export default GeneralLayout;
