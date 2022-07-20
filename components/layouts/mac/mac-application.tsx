import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { AppType } from '../../../modules/appdata';
import Link from 'next/link';

/* styles */
import styles from '../../../styles/application.module.scss';

const Application = ({ name, src, path }: AppType): ReactElement => {
  const router = useRouter();

  return (
    <li>
      <Link href={{ pathname: path }}>
        <div className={styles.app} title={name}
        style={{
          backgroundImage: `url("/images/${src}")`
        }} />
      </Link>
      <div className={styles.status}>
        {path === router.pathname && <span>•</span>}
      </div>
    </li>
  )
};

Application.displayName = 'Application';

export default Application;