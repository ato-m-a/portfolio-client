import { ReactElement } from 'react';
import Image from 'next/image';

/* styles */
import styles from '../../../../../styles/intro.module.scss';

const Intro = (): ReactElement => {
  return (
    <section className={styles.intro}>
      {/* image */}
      <div className={styles.image__wrapper}>
        <div className={styles.image}>
          <Image src="/images/memoticon.svg" alt="my_logo" layout="fill" />
        </div>
      </div>
      {/* text */}
      <div className={styles.text}>
        <span className={styles.text__title}>ato-m-a</span>
        <div className={styles.text__description}>

        </div>
      </div>
    </section>
  )
};

export default Intro;