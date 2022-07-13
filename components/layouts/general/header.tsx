import { ReactElement } from 'react';
import Image from 'next/image';

/* styles */
import styles from '../../../styles/general-layout.module.scss';

const GeneralHeader = (): ReactElement => {
  return (
    <header className={styles.header}>
      <Image src="/images/memoticon.png" alt="bear_logo" width={60} height={60} />
    </header>
  )
};

export default GeneralHeader;