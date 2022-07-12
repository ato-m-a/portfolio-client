import { ReactElement, Fragment, useState } from 'react';
import { AppType, AppData } from '../../modules/appdata';

/* styles */
import styles from '../../styles/layout.module.scss';

/* components */
import Application from './application';

const Docker = (): ReactElement => {
  return (
    <Fragment>
      <footer className={styles.docker}>
        <nav className={styles.application__container}>
          <ul>
            {
              AppData.map(app => (
                <Application src={app.src} name={app.name} path={app.path} key={app.name} />
              ))
            }
          </ul>
        </nav>
      </footer>
    </Fragment>
  )
};

export default Docker;