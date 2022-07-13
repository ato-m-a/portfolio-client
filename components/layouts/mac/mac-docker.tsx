import { ReactElement, Fragment } from 'react';
import { AppData } from '../../../modules/appdata';

/* styles */
import styles from '../../../styles/layout.module.scss';

/* components */
import Application from './mac-application';

const Docker = (): ReactElement => {
  return (
    <Fragment>
      <footer className={styles.docker}>
        <nav className={styles.application__container}>
          <ul>
            {
              AppData.map(app => (
                <Application src={app.src} name={app.name} path={app.path} key={app.name} external={app.external} />
              ))
            }
          </ul>
        </nav>
      </footer>
    </Fragment>
  )
};

export default Docker;