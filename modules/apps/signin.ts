import { CommandInput, CommandOutput } from '../commands';
import axios from 'axios';

export const signin = async (input: CommandInput): Promise<CommandOutput> => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://xn--s55bw1vqg.com' : 'http://localhost:8000';
  axios.defaults.withCredentials = true;

  const { command, session, executingCommand, executingCommandType, requiredToSave } = input;

  // 첫 실행
  if (!executingCommandType) {
    return {
      message: [{ session: `(base) ${session}@hong ~ %`, message: command }],
      executingCommand: 'signin',
      executingCommandType: 'username'
    };
  } else {
    // 아이디
    if (executingCommandType === 'username') {
      if (command === '') {
        return {
          message: [
            { session: 'username:', message: '' },
            { session: 'signin:', message: 'invalid username' }
          ]
        }
      }

      return {
        requiredToSave: { username: command },
        executingCommand,
        executingCommandType: 'password',
        message: [{ session: 'username:', message: command }],
        requiredToExecute: 'text_secure'
      }
    // 패스워드
    } else {
      // 아무것도 입력하지 않았으면
      if (command === '') {
        const count = requiredToSave.count ? requiredToSave.count + 1 : 1;
        // 카운트가 3보다 적으면
        if (count < 3) {
          return {
            requiredToSave: { ...requiredToSave, count },
            executingCommand,
            executingCommandType: 'password',
            message: [{ session: 'password:', message: '' }],
            requiredToExecute: 'text_secure'
          }
        } else {
          return {
            message: [
              { session: 'password:', message: '' },
              { session: 'signin:', message: 'invalid password' }
            ]
          }
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
            { session: 'password:', message: '' },
            { session: 'signin:', message: 'successfully signed in' },
            
          ]
        }
      } catch {
        return {
          message: [
            { session: 'password:', message: '' },
            { session: 'signin:', message: 'signin failed' }
          ]
        }
      }
    }
  }
}