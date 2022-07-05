import { ReactElement, Fragment, useState } from 'react';

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
            <Application src="terminal.png" path="/terminal" name="터미널" />
          </ul>
        </nav>
      </footer>
    </Fragment>
  )
};

export default Docker;