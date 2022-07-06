import type { Page } from '../types/page';
import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Draggable from 'react-draggable';

/* layout */
import GeneralLayout from '../layouts/general';

/* styles */
import styles from '../styles/terminal.module.scss';

/* redux */
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectConfig, updateConfig } from '../store/reducers/terminal';

const Terminal: Page = () => {
  const nodeRef = useRef(null);

  const dispatch = useAppDispatch();
  const olderConfig = useAppSelector(selectConfig);

  // config
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const trackPos = (data: { x: number, y:number }) => {
    setPosition({ x: data.x, y: data.y });
    dispatch(updateConfig({ position: { x: data.x, y: data.y } }));
  };

  useEffect(() => {
    setPosition({ ...olderConfig.position });
  }, [olderConfig]);
  
  return (
    <Fragment>
      <Draggable position={position} onDrag={(e, data) => trackPos(data)} nodeRef={nodeRef} bounds='parent'>
        <section className={styles.terminal} ref={nodeRef}>
          <div className={styles.terminal__controlbar}>
            <div className={styles.terminal__btnzone}>
              <Link href={{ pathname: '/' }}>
                <span className={styles.btn_red} />
              </Link>
              <span className={styles.btn_yellow} />
              <span className={styles.btn_green} />
            </div>
            <div className={styles.terminal__title}>
              터미널
            </div>
          </div>
          <div className={styles.terminal__body}>
            (base) ato-m-a@Tom ~ %
          </div>
        </section>
      </Draggable>
    </Fragment>
  )
};

Terminal.layout = GeneralLayout;

export default Terminal;