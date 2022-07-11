import { ReactElement, useState, useEffect } from 'react';

/* styles */
import styles from '../../styles/layout.module.scss';

const StatusBar = (): ReactElement => {
  const stringFormat = (date: Date): string => {
    const week = ['월', '화', '수', '목', '금', '토', '일'];

    const am_pm = date.getHours() >= 12 ? '오후' : '오전';
    const month = date.getMonth() + 1;
    const day = week[date.getDay()];
    const hours = date.getHours() >= 13 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes().toString().length < 2 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${month}월 ${date.getDate()}일 (${day}) ${am_pm} ${hours}:${minutes}`;
  }

  const [available, setAvailable] = useState<boolean>(false);
  const [time, setTime] = useState<string>(stringFormat(new Date()));
  
  useEffect(() => {
    setAvailable(true);
  }, [])

  useEffect(() => {
    const watchTime = setInterval(() => {
      setTime(stringFormat(new Date()));
    }, 1000);
    return () => clearInterval(watchTime);
  }, []);

  return (
    <div className={styles.header__statusbar}>
      <div className={styles.header__btn}>
        {available && time}
      </div>
    </div>
  )
};

export default StatusBar;