import type { Command } from '../common';
import app from '../controller';

export const MessageMiddleware = async (command: Command): Promise<Command[]> => {
  const { session, text, running, args, isSecure } = command;

  const primaryCommand = text.split(' ').at(0);

  // 실행 중 앱 없으면
  if (!running) {
    // 빈 커맨드
    if (text === '') {
      return [{ session: `(base) ${session}@hong ~ %`, text: '' }];
    }

    // 실행할 앱
    const execute = app[primaryCommand];

    // 유효하지 않은 앱 실행
    if (!execute) {
      return [
        { session: `(base) ${session}@hong ~ %`, text },
        { session: 'Hong:', text: `command not found: ${primaryCommand}` }
      ]
    }
  
    // if sudo
    const response = await execute(command);

    return [
      { session: `(base) ${session}@hong ~ %`, text },
      ...response
    ]
  }
  // 실행 중 앱 있으면 바로 연결
  else {
    const execute = app[running];
    const response = await execute(command);

    return [
      { session: `${args}:`, text: isSecure ? '' : text },
      ...response
    ];
  }
}