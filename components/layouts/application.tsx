import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type config = {
  src: string;
  path: string;
  name: string;
}

/* styles */
import styles from '../../styles/application.module.scss';

const Application = ({ src, path, name }: config): ReactElement => {
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
        {router.pathname === path && <span>•</span>}
      </div>
    </li>
  )
};

Application.displayName = 'Application';

export default Application;