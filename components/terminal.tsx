import { ReactElement, useState, useRef, useEffect } from 'react';
import { ExecuteCommand, CommandOutput } from '../modules/commands';

/* redux */
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectUser, updateUser, User, vacateUser } from '../store/reducers/users';

type Props = {
  onMouseEnter: () => void;
  onTouchStartCapture: () => void;
}

type Message = {
  session: string;
  message: string;
}

/* styles */
import styles from '../styles/terminal.module.scss';

const TerminalBody = ({ onMouseEnter, onTouchStartCapture }: Props): ReactElement => {
  const [HTMLLoaded, setHTMLLoaded] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // 인풋 ref
  const inputRef = useRef<HTMLDivElement>(null);

  // 커맨드 임시 저장소
  const [tempMemory, setTempMemory] = useState<any>(null);

  // 세션
  const session = useAppSelector(selectUser);
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    setUser(session)
  }, [session]);

  // 메시지
  const [messages, setMessages] = useState<Message[]>([]);
  const [executingCommand, setExecutingCommand] = useState<string>(null);
  const [executingCommandType, setExecutingCommandType] = useState<string>(null);
  const [execution, setExecution] = useState<any>(null);

  const commandSetter = (result: CommandOutput): void => {
    // 응답 받은 유효한 커맨드가 있을 때
    try {
      setExecutingCommand(result.executingCommand);
    } catch {
      setExecutingCommand(null);
    }
    // 응답 받은 유효한 커맨드 타입이 있을 때 (다음 커맨드)
    try {
      setExecutingCommandType(result.executingCommandType);
    } catch {
      setExecutingCommandType(null);
    }
    // 저장해야 할 것이 있으면
    try {
      setTempMemory(result.requiredToSave);
    } catch {
      setTempMemory(null);
    }
    // 실행해야 할 것이 있으면
    try {
      setExecution(result.requiredToExecute);
    } catch {
      setExecution(null);
    }
  }

  // 입력 (Enter)
  const input = async (e: any) => {
    e.preventDefault();
    if (inputRef.current && !e.nativeEvent.isComposing) {
      const message = inputRef.current.innerText;
      inputRef.current.innerText = '';

      const executeResult = !executingCommand
        ? await ExecuteCommand({ session: user.username, command: message, role: user.role ? user.role : 'guest' })
        : await ExecuteCommand({ 
          session: user.username,
          command: message,
          executingCommand,
          executingCommandType,
          role: user.role ? user.role : 'guest',
          requiredToSave: tempMemory
        });

      commandSetter(executeResult);

      setMessages([...messages, ...executeResult.message]);
    }
  }

  // 포커스 이벤트리스너
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

  // 실행
  useEffect(() => {
    const textSecure = (activation: boolean) => {
      if (activation) {
        document.getElementById('inputDiv').style.color = 'transparent';
      } else {
        document.getElementById('inputDiv').style.color = '#fff';
      }
    }

    switch (execution) {
      case 'text_secure':
        textSecure(true);
        break;
      case 'updateUser':
        textSecure(false);
        dispatch(updateUser(tempMemory));
        setUser(tempMemory);
        break;
      case 'vacateUser':
        textSecure(false);
        setUser(null);
        dispatch(vacateUser());
        break;
      default:
        textSecure(false);
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execution]);

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
            <div className={styles.input}>{message.message}</div>
          </div>
        ))}
        <div className={styles.line}>
          <span className={styles.session}>
            {
              executingCommandType
              ? `${executingCommandType}:`
              : `(base) ${user ? user.username : session.username}@hong ~ %`
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