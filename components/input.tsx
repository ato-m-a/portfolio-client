import { ChangeEvent, useState, useEffect, KeyboardEvent, useRef, forwardRef, useImperativeHandle } from 'react';

type Props = {
  onChange: (text: string) => void;
  close: (e: any) => void;
  onKeyDown: (e: KeyboardEvent) => Promise<void>;
  isSecure?: boolean;
  oldText?: string;
}

/* styles */
import styles from '../styles/android.module.scss';

/* icons */
import { RiPencilFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';

const AndroidInput = forwardRef((props: Props, ref) => {
  const { onChange, oldText, close, onKeyDown, isSecure } = props;
  useImperativeHandle(ref, () => ({
    vacateInput: (): void => {
      setText('');
    }
  }));
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>(oldText ? oldText : '');

  const localOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // detect text change
  useEffect(() => {
    onChange(text);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (inputRef.current) {
      if (isSecure) {
        inputRef.current.style.color = 'transparent';
      } else {
        inputRef.current.style.color = '#fff';
      }
    }
  }, [isSecure]);

  return (
    <div className={styles.input__wrapper}>
      <label htmlFor="input-android" className={styles.input__icon}>
        <RiPencilFill />
      </label>
      <input type="text" value={text} id="input-android" onChange={localOnChange}
      onKeyDown={(e) => onKeyDown(e)} ref={inputRef} placeholder='명령어를 입력해주세요.'
      autoCapitalize="off" autoCorrect="off" spellCheck={false} autoComplete="off" />
      <div className={styles.close__icon} onClick={(e) => close(e)}>
        <AiOutlineClose />
      </div>
    </div>
  )
});

AndroidInput.displayName = 'AndroidInput';

export default AndroidInput;