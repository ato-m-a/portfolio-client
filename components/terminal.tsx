import { ReactElement, useState, useRef, useEffect } from 'react';
import store from '../store';

/* redux */
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectUser, updateUser, User, vacateUser } from '../store/reducers/users';

/* terminal */
import type { Command, TerminalState, ActionState } from '../modules/terminal/common';
import { MessageService } from '../modules/terminal';
import { TerminalService } from '../modules/terminal/services/terminal.service';
import { SudoService, SudoState } from '../modules/terminal/services/sudo.service';
import { ActionService } from '../modules/terminal/services/action.service';

type Props = {
  onMouseEnter: () => void;
  onTouchStartCapture: () => void;
}

/* styles */
import styles from '../styles/terminal.module.scss';

const TerminalBody = ({ onMouseEnter, onTouchStartCapture }: Props): ReactElement => {
  const [HTMLLoaded, setHTMLLoaded] = useState<boolean>(false);
  // 인풋 ref
  const inputRef = useRef<HTMLDivElement>(null);

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

  // 입력 (Enter)
  const input = async (e: any) => {
    e.preventDefault();
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
        {messages.map((message, index) => (
          <div className={styles.line} key={index}>
            <span className={styles.session}>{message.session}</span>
            <div className={styles.input}>{message.text}</div>
          </div>
        ))}
        <div className={styles.line}>
          <span className={styles.session}>
            {
              terminalState
              ? `${terminalState.args}:`
              : `(base) ${user?.username}@hong ~ %`
            }
          </span>
          <div className={styles.input} ref={inputRef} id="inputDiv" contentEditable={true}
          onKeyDown={(e) => e.key === 'Enter' && input(e)} spellCheck={false} role="textbox"
          autoCapitalize="off" autoCorrect="off" aria-autocomplete="none" />
        </div>
      </div>
    </div>
  )
};

export default TerminalBody;