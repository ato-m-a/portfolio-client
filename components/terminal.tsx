import { ReactElement, useState, useRef, useEffect, KeyboardEvent } from 'react';
import store from '../store';

/* redux */
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectUser, updateUser, User, vacateUser } from '../store/reducers/users';

/* terminal */
import type { Command, TerminalState, ActionState, SudoState } from '../modules/terminal/common';
import { MessageService, TerminalService, SudoService, ActionService } from '../modules/terminal';

type Props = {
  onMouseEnter: () => void;
  onTouchStartCapture: () => void;
  isMobile: boolean;
}

/* component */
import AndroidInput from './input';

/* styles */
import styles from '../styles/terminal.module.scss';

/* icons */
import { RiPencilFill } from 'react-icons/ri';

const TerminalBody = ({ onMouseEnter, onTouchStartCapture, isMobile }: Props): ReactElement => {
  const [HTMLLoaded, setHTMLLoaded] = useState<boolean>(false);
  // 인풋 ref
  const inputRef = useRef<HTMLInputElement>(null);
  const androidRef = useRef<any>(null);

  const dispatch = useAppDispatch();

  // user session store subscribe
  const session = useAppSelector(selectUser);
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    setUser(session);
  }, [session]);
  useEffect(() => {
    const subscription = store.subscribe(() => {
      const user = store.getState().user;
      setUser(user);
    });
    return () => subscription();
  }, []);

  // terminal message subscribe
  const [messages, setMessages] = useState<Command[]>([]);
  useEffect(() => {
    const subscription = MessageService.onConsole().subscribe((terminalMessage: Command[]) => {
      setMessages(messages => [...messages, ...terminalMessage]);
    });
    return () => subscription.unsubscribe();
  }, []);

  // terminal state subscribe
  const [terminalState, setTerminalState] = useState<TerminalState | null>(null);
  useEffect(() => {
    const subscription = TerminalService.onTerminal().subscribe((state: TerminalState) => {
      // 터미널 상태 변화 감지
      if (state && Object.keys(state).length !== 0) {
        setTerminalState(state);
      } else {
        setTerminalState(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (terminalState) {
      // if isSecure
      if (terminalState.isSecure) {
        document.getElementById('inputDiv').style.color = 'transparent';
      } else {
        document.getElementById('inputDiv').style.color = '#fff';
      }
    } else {
      document.getElementById('inputDiv').style.color = '#fff';
    }
  }, [terminalState]);

  // terminal sudo state subscribe
  const [sudoState, setSudoState] = useState<SudoState | null>(null);
  useEffect(() => {
    const subscription = SudoService.onSudo().subscribe((state: SudoState) => {
      // 상태 변화 감지
      if (state && Object.keys(state).length !== 0) {
        setSudoState(state);
      } else {
        setSudoState(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // terminal action state subscribe
  useEffect(() => {
    const subscription = ActionService.onAction().subscribe((state: ActionState) => {
      if (state && Object.keys(state).length !== 0) {
        const { action, payload } = state;

        switch (action) {
          case 'setUser':
            dispatch(updateUser(payload));
            break;
          case 'vacateUser':
            dispatch(vacateUser());
            break;
        }
      }
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 입력 handler
  const input = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      androidRef.current && androidRef.current.vacateInput();

      if (inputRef.current && !e.nativeEvent.isComposing) {
        const inputData: Command = {
          session: user.username,
          text: inputRef.current.innerText,
          running: terminalState && terminalState.running,
          args: terminalState && terminalState.args,
          isSecure: terminalState && terminalState.isSecure,
          toSave: terminalState && terminalState.toSave,
          sudo: sudoState && {
            next: sudoState.next,
            command: sudoState.command
          }
        };

        inputRef.current.innerText = '';
        MessageService.sendCommand(inputData);
      }
    } else {
      if (e.ctrlKey && e.key === 'c') {
        const session = document.getElementById('line-session').innerText;
        const text = terminalState && terminalState.isSecure ? '' : document.getElementById('inputDiv').innerText;
        MessageService.sendMessage({ session, text });
        inputRef.current.innerText = '';
      }
    }
  }

  // set focus eventlistener
  useEffect(() => {
    setHTMLLoaded(true);
    const FocusEvent = () => {
      document.getElementById('inputDiv').focus();
    };
    
    document.getElementById('terminalBody').addEventListener('click', FocusEvent);
    document.getElementById('terminalBody').addEventListener('touchstart', FocusEvent);
    return () => {
      if (document.getElementById('terminalBody')) {
        document.getElementById('terminalBody').removeEventListener('click', FocusEvent);
        document.getElementById('terminalBody').removeEventListener('touchstart', FocusEvent);
      }
    }
  }, []);

  // for android
  const [inputDispose, setInputDispose] = useState<boolean>(false);
  const onChangeForAndroid = (text: string) => {
    inputRef.current.innerText = text;
  };
  const closeInput = (e: any) => {
    e.preventDefault();
    setInputDispose(false);
  }

  // return static html
  if (!HTMLLoaded) {
    return (
      <div className={styles.terminal__wrapper}>
        <div className={styles.terminal__body} id="terminalBody"
        onMouseEnter={onMouseEnter} onTouchStartCapture={onTouchStartCapture}>
          <div className={styles.input} ref={inputRef} id="inputDiv" contentEditable={true}
          onKeyDown={(e) => e.key === 'Enter' && input(e)} spellCheck={false} role="textbox" 
          autoCapitalize="off" autoCorrect="off" aria-autocomplete="none" />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.terminal__wrapper}>
      <div className={styles.terminal__body} id="terminalBody"
      onMouseEnter={onMouseEnter} onTouchStartCapture={onTouchStartCapture}>
        {
          inputDispose && 
          <AndroidInput onChange={onChangeForAndroid} close={closeInput} ref={androidRef}
          isSecure={terminalState && terminalState.isSecure}
          oldText={inputRef.current && inputRef.current.innerText} onKeyDown={input} />
        }
        {messages.map((message, index) => (
          <div className={styles.line} key={index}>
            <span className={styles.session}>{message.session}</span>
            <div className={styles.input}>{message.text}</div>
          </div>
        ))}
        <div className={styles.line}>
          <span className={styles.session} id="line-session">
            {
              terminalState
              ? `${terminalState.args}:`
              : `(base) ${user?.username}@hong ~ %`
            }
          </span>
            <div className={styles.input} ref={inputRef} id="inputDiv" contentEditable={!isMobile && navigator && !navigator.userAgent.toLowerCase().includes('android')}
            onKeyDown={(e) => input(e)} spellCheck={false} role="textbox"
            autoCapitalize="off" autoCorrect="off" aria-autocomplete="none" />
            {
              isMobile && navigator && navigator.userAgent.toLowerCase().includes('android') &&
              !inputDispose &&
              <div className={styles.android__btn} onTouchStart={() => setInputDispose(true)}>
                <RiPencilFill />
              </div>
            }
        </div>
      </div>
    </div>
  )
};

export default TerminalBody;