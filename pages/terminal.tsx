import type { Page } from '../types/page';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { detector } from '../modules/detector';
import Draggable from 'react-draggable';
import Link from 'next/link';

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [savedPosition, savePosition] = useState({ x: 0, y: 0 });
  const [expand, setExpand] = useState<boolean>(false);
  const [dragDisable, setDragDisable] = useState<boolean>(false);
  const trackPos = (data: { x: number, y:number }) => {
    setPosition({ x: data.x, y: data.y });
    savePosition({ x: data.x, y: data.y });
    dispatch(updateConfig({ position: { x: data.x, y: data.y } }));
  };

  useEffect(() => {
    navigator && setIsMobile(detector(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (isMobile) {
      setPosition({ x: 0, y: 0 });
      window.matchMedia('(orientation: portrait)').matches && setIsPortrait(true);

      const ResizeListener = () => {
        if (window.matchMedia('(orientation: portrait)').matches) {
          setIsPortrait(true);
        } else {
          setIsPortrait(false);
        }
      }
      window.addEventListener('resize', ResizeListener);
      return () => {
        window.removeEventListener('resize', ResizeListener);
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (isPortrait) {
      setPosition({ x: 0, y: 0 });
      setExpand(true);
    } else {
      setPosition({ ...savedPosition });
      setExpand(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPortrait]);

  useEffect(() => {
    setPosition({ ...olderConfig.position });
    savePosition({ ...olderConfig.position });
  }, [olderConfig]);

  useEffect(() => {
    if (expand) setDragDisable(true);
  }, [expand]);

  const goHome = async (): Promise<void> => {
    setDragDisable(true);
    await router.replace('/');
  };

  const expandTerminal = (setType: boolean): void => {
    if (setType && !expand) {
      setDragDisable(true);
      setPosition({ x: 0, y: 0 });
      setExpand(true);
      setDragDisable(false);
    } else if (!setType && expand) {
      setDragDisable(true);
      setPosition({ ...savedPosition });
      setExpand(false);
      setDragDisable(false);
    }
  };

  // terminal message state
  
  return (
    <Fragment>
      <Draggable position={position} onDrag={(e, data) => trackPos(data)} nodeRef={nodeRef} 
      bounds='parent' disabled={dragDisable}>
        <section className={styles.terminal} id="terminal" ref={nodeRef} style={expand && { width: '100%', height: 'calc(100% - 94px)' }}>
          <div className={styles.terminal__controlbar} onMouseEnter={() => !expand && setDragDisable(false)}
          onTouchStartCapture={() => !expand && setDragDisable(false)}>
            <div className={styles.terminal__btnzone}>
              <Link href={{ pathname: '/' }}>
                <span className={styles.btn_red} onTouchStart={goHome} />
              </Link>
              <span className={styles.btn_yellow} 
              onClick={() => !isPortrait && expandTerminal(false)} onTouchStart={() => !isPortrait && expandTerminal(false)} />
              <span className={styles.btn_green} 
              onClick={() => !isPortrait && expandTerminal(true)} onTouchStart={() => !isPortrait && expandTerminal(true)} />
            </div>
            <div className={styles.terminal__title}>
              터미널
            </div>
          </div>
          <div className={styles.terminal__body} onMouseEnter={() => !expand && setDragDisable(true)}
          onTouchStartCapture={() => !expand && setDragDisable(true)}>
            (base) guest@hong ~ %
          </div>
        </section>
      </Draggable>
    </Fragment>
  )
};

Terminal.layout = GeneralLayout;

export default Terminal;