import { CommandInput, CommandOutput } from '../commands';
import axios from 'axios';

type suCommand = CommandInput & {
  sudo?: boolean;
}

export const su = async (input: suCommand): Promise<CommandOutput> => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://xn--sr3b80m9nbq6ao9b.com' : 'http://localhost:8000';
  axios.defaults.withCredentials = true;

  const { command, session, executingCommand, executingCommandType, requiredToSave, sudo, role } = input;

  const username = command.split(' ')[1];

  if (!username && !executingCommandType) {
    return {
      message: [
        { session: `(base) ${session}@hong ~ %`, message: command },
        { session: 'Su:', message: 'Sorry' }
      ]
    }
  }

  // 첫 실행
  if (!executingCommandType) {
    // 로그아웃
    if (username === 'guest') {
      return {
        requiredToExecute: 'vacateUser',
        message: [
          { session: `(base) ${session}@hong ~ %`, message: command }
        ]
      }
    }

    // 패스워드 변경
    if (username === 'passwd') {
      const targetname = command.split(' ')[2];

      // 대상 username 없을 때
      if (!targetname) {
        return {
          message: [
            { session: `(base) ${session}@hong ~ %`, message: command },
            { session: 'Su:', message: 'Sorry' }
          ]
        }
      } else {
        // 변경하려는 username과 session name 불일치
        if (targetname !== session) {
          // sudo 혹은 super 권한 (pass)
          if (role === 'super' || sudo) {
            return {
              message: [{ session: `(base) ${session}@hong ~ %`, message: command }],
              executingCommand: 'suPasswd',
              executingCommandType: 'password',
              requiredToSave: { username: targetname },
              requiredToExecute: 'text_secure'
            }
          // 권한 미획득
          } else {
            return {
              message: [
                { session: `(base) ${session}@hong ~ %`, message: command },
                { session: 'Su:', message: 'Sorry' }
              ]
            }
          }
        // 일치
        } else {
          return {
            message: [{ session: `(base) ${session}@hong ~ %`, message: command }],
            executingCommand: 'suPasswd',
            executingCommandType: 'password',
            requiredToSave: { username: targetname },
            requiredToExecute: 'text_secure'
          }
        }
      }
    }

    return {
      message: [{ session: `(base) ${session}@hong ~ %`, message: command }],
      executingCommand: 'su',
      executingCommandType: 'password',
      requiredToSave: { username },
      requiredToExecute: 'text_secure'
    };

  // 로그인 할 때
  } else if (executingCommandType === 'password') {
    // 아무것도 입력하지 않았으면
    if (command === '') {
      return {
        message: [
          { session: 'password:', message: '' },
          { session: 'Su:', message: 'Sorry' }
        ]
      }
    }

    try {
      const response = await axios.post('/api/v1/auth/signin', {
        username: requiredToSave.username,
        password: command
      });

      const session = {
        username: response.data.username,
        email: response.data.email,
        uuid: response.data.uuid,
        role: response.data.role
      };

      return {
        requiredToSave: session,
        requiredToExecute: 'updateUser',
        message: [
          { session: 'password:', message: '' }
          
        ]
      }
    } catch {
      return {
        message: [
          { session: 'password:', message: '' },
          { session: 'Su:', message: 'Sorry' }
        ]
      }
    }
  }
}

export const suPasswd = async (input: suCommand): Promise<CommandOutput> => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://xn--sr3b80m9nbq6ao9b.com' : 'http://localhost:8000';
  axios.defaults.withCredentials = true;

  const { command, session, executingCommand, executingCommandType, requiredToSave, sudo, role } = input;

  // 비어있을 때
  if (command === '') {
    return {
      message: [
        { session: 'password:', message: '' },
        { session: 'Su:', message: 'Sorry' }
      ]
    }
  }

  try {
    await axios.post('/api/v1/auth/update/password', { username: requiredToSave.username, password: command });

    return {
      message: [
        { session: 'password:', message: '' },
        { session: 'Su:', message: 'password changed successfully' }
      ]
    }
  } catch {
    return {
      message: [
        { session: 'password:', message: '' },
        { session: 'Su:', message: 'Sorry' }
      ]
    }
  }
}