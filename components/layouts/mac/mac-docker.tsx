import { ReactElement, Fragment, useEffect, useState } from 'react';
import { AppData } from '../../../modules/appdata';

/* styles */
import styles from '../../../styles/layout.module.scss';

/* components */
import Application from './mac-application';

const Docker = (): ReactElement => {
  const [isIos, setIsIos] = useState<boolean>(false);
  useEffect(() => {
    if (navigator.userAgent.toLowerCase().includes('iphone')) {
      setIsIos(true);
    }
  }, []);

  return (
    <Fragment>
      <footer className={styles.docker} style={{
        bottom: isIos ? '18.5px' : '3.5px'
      }}>
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