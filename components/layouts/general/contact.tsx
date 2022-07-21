import { ReactElement, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import axios from 'axios';

type Props = {
  open: boolean;
  close: () => void;
}

type Form = {
  name: string;
  email: string;
  subject: string;
  content: string;
}

/* styles */
import styles from '../../../styles/contact.module.scss';

/* icons */
import { GoMarkGithub } from 'react-icons/go';
import { GrMail } from 'react-icons/gr';

const ContactMe = ({ open, close }: Props): ReactElement => {
  // modal visible state
  const [animate, setAnimate] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(open);
  // message state
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  // form state
  const [formState, setFormState] = useState<boolean>(true);

  // close modal function
  const closeModal = () => {
    setErrorMessage('');
    setMessage('');
    setFormState(true);
    initForm();
    close();
  }

  const [formData, setFormData] = useState<Form>({
    name: '',
    email: '',
    subject: '',
    content: ''
  });

  // form handler
  const { name, email, subject, content } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initForm = () => {
    setFormData({ name: '', email: '', subject: '', content: '' });
  }

  const formSubmit = async (): Promise<void> => {
    setErrorMessage('');
    const validation = (value: string) => {
      const throwError = (message: string) => {
        throw new Error(message);
      }

      return (name: string) => {
        if (value === '') {
          throwError(`${name} 항목을 입력해주세요.`);
        };

        if (name === '이메일') {
          const errorString = '올바른 이메일 형식이 아닙니다.';

          if (!value.includes('@') || !value.includes('.')) {
            throwError(errorString);
          } else {
            const splitWithAt = value.split('@');
            
            const at_first = splitWithAt.at(0);
            const at_second = splitWithAt.at(1);

            if (!at_first || at_first === '') {
              throwError(errorString);
            }

            if (!at_second || at_second === '') {
              throwError(errorString);
            } else {
              const splitWithDot = at_second.split('.');

              const dot_first = splitWithDot.at(0);
              const dot_second = splitWithDot.at(1);

              if (!dot_first || dot_first === '') {
                throwError(errorString);
              }
              
              if (!dot_second || dot_second === '') {
                throwError(errorString);
              }
            }
          }
        };

        return value;
      };
    };

    try {
      const dataset = {
        name: validation(name)('성명'),
        email: validation(email)('이메일'),
        subject: validation(subject)('제목'),
        content: validation(content)('내용')
      };

      await axios.post('/api/v1/contact', dataset);
      setMessage('연락 주셔서 감사합니다! 빠른 시일 내로 회신 드리도록 하겠습니다');
      initForm();
      setFormState(false);
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    if (animate && !visible) {
      setVisible(true);
      setTimeout(() => setVisible(false), 300);
    }
    if (open === true) {
      setAnimate(open);
    } else {
      setTimeout(() => setAnimate(open), 300);
    }
  }, [visible, open, animate]);

  useEffect(() => {
    const keyDown = (e: any) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!animate && !visible) {
    return null;
  };

  return (
    <div className={`${styles.contact__wrapper} ${open ? styles.open : styles.close}`}>
      <section>
        <div className={styles.contact__intro}>
          <div className={styles.contact__intro_image}>
            <div className={styles.contact__image}>
              <Image src="/images/memoticon.svg" alt="my_logo" layout="fill" />
            </div>
          </div>
          <div className={styles.contact__intro_content}>
            <span className={styles.contact__content_big}>안녕하세요!</span>
            <span className={styles.contact__content_small}>주니어 웹 FE 개발자 홍준혁입니다.</span>
            <span className={styles.contact__content_small}>아래의 양식으로 보내주시면 빠르게 회신 드리겠습니다.</span>
            <div className={styles.contact__content_btnzone}>
              <a href="https://github.com/ato-m-a" rel="noreferrer" target="_blank"
               className={styles.contact__button}>
                <GoMarkGithub />
              </a>
              <a href="mailto:atomjh0295@gmail.com" className={styles.contact__button}>
                <GrMail />
              </a>
            </div>
          </div>
        </div>
        <form className={styles.contact__form}>
          {/* message */}
          <div className={`${styles.contact__message} ${errorMessage && styles.red} ${message && styles.green}`}>
            {errorMessage && errorMessage}
            {message && message}
          </div>
          {/* name */}
          <div className={styles.contact__input}>
            <label htmlFor="name">성명</label>
            <input type="text" value={name} name="name" onChange={onChange} disabled={!formState} />
          </div>
          {/* email */}
          <div className={styles.contact__input}>
            <label htmlFor="email">이메일</label>
            <input type="text" value={email} name="email" onChange={onChange} disabled={!formState} />
          </div>
          {/* subject */}
          <div className={styles.contact__input}>
            <label htmlFor="subject">제목</label>
            <input type="text" value={subject} name="subject" onChange={onChange} disabled={!formState} />
          </div> 
          {/* content */}
          <div className={styles.contact__input}>
            <label htmlFor="content">내용</label>
            <textarea value={content} name="content" onChange={onChange}
            rows={8} cols={33} autoCapitalize="none" autoComplete="off" autoCorrect="none" disabled={!formState} />
          </div> 
        </form>
        <div className={styles.contact__buttons}>
          <button type="button" onClick={formSubmit}>
            SUBMIT
          </button>
          <button type="button" onClick={closeModal}>
            CLOSE
          </button>
        </div>
      </section>
    </div>
  )
};

export default ContactMe;