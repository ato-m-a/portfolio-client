import { signin } from './apps/signin';
import { su, suPasswd } from './apps/su';
import axios from 'axios';

export type CommandInput = {
  command: string;
  session: string;
  role: string;
  executingCommand?: string;
  executingCommandType?: string;
  requiredToSave?: any;
}

export type CommandOutput = {
  message: {
    session: string;
    message: string;
  }[];
  executingCommand?: string;
  executingCommandType?: string;
  requiredToSave?: any;
  requiredToExecute?: any;
}

export const ExecuteCommand = async (inputData: CommandInput): Promise<CommandOutput> => {
  const { command, session, executingCommand, executingCommandType, requiredToSave } = inputData;
  const availableCommands = { signin: true, su: true, suPasswd: true };

  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://xn--s55bw1vqg.com' : 'http://localhost:8000';
  axios.defaults.withCredentials = true;

  const mainCommand = command.split(' ')[0];

  // 아무 커맨드도 입력하지 않았으면
  if (!mainCommand && !executingCommand) {
    return {
      message: [{ session: `(base) ${session}@hong ~ %`, message: '' }]
    }
  }

  // 실행 커맨드 없으면
  if (!executingCommand) {
    if (!availableCommands[mainCommand]) {
      return {
        message: [
          { session: `(base) ${session}@hong ~ %`, message: command },
          { session: 'hong: ', message: `command not found: ${mainCommand}` }
        ]
      };
    }

    // 커맨드 별 실행 구분
    switch (mainCommand) {
      case 'signin':
        return await signin(inputData);
      case 'su':
        return await su(inputData);
    }
  // 실행 커맨드 있으면
  } else {
    switch (executingCommand) {
      case 'signin':
        return await signin(inputData);
      case 'su':
        return await su(inputData);
      case 'suPasswd':
        return await suPasswd(inputData)
    }
  }
}