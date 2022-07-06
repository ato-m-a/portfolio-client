import type { Page } from '../types/page';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Draggable from 'react-draggable';

/* layout */
import GeneralLayout from '../layouts/general';

/* styles */
import styles from '../styles/terminal.module.scss';

/* redux */
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectConfig, updateConfig } from '../store/reducers/terminal';

const Terminal: Page = () => {
  const router = useRouter();
  const nodeRef = useRef(null);

  const dispatch = useAppDispatch();
  const olderConfig = useAppSelector(selectConfig);

  // config
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStatus, setDragStatus] = useState<boolean>(false);
  const trackPos = (data: { x: number, y:number }) => {
    setPosition({ x: data.x, y: data.y });
    dispatch(updateConfig({ position: { x: data.x, y: data.y } }));
  };

  useEffect(() => {
    setPosition({ ...olderConfig.position });
  }, [olderConfig]);

  const toHome = async () => {
    setDragStatus(false);
    await router.replace('/');
  }
  
  return (
    <Fragment>
      <Draggable position={position} onDrag={(e, data) => trackPos(data)} nodeRef={nodeRef} 
      bounds='parent' disabled={dragStatus}>
        <section className={styles.terminal} ref={nodeRef}>
          <div className={styles.terminal__controlbar}>
            <div className={styles.terminal__btnzone}>
              <span className={styles.btn_red} onClick={toHome} onTouchStart={toHome} />
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