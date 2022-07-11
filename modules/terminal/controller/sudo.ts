import { Command } from '../common';
import { SudoService } from '../services/sudo.service';
import { TerminalService } from '../services/terminal.service';
import app from './index';
import axios from 'axios';

// sudo wrapper
export const sudo = async (command: Command): Promise<Command[] | void> => {
  const { session, text, running, args, isSecure, sudo } = command;

  const initState = () => {
    SudoService.setState(null);
    TerminalService.setState(null);
  }

  // 실행 커맨드
  const next = text.split(' ').at(1);
  // 실행 커맨드 미입력
  if (!sudo && !next || next === '') {
    return [
      { session: 'usage:', text: 'sudo [command]' }
    ]
  }

  // sudo initial
  if (!running) {
    TerminalService.setState({ running: 'sudo', args: 'password', isSecure: true });
    SudoService.setState({ next, command: text });
    return [];
  } else {
    const password = command.text;
    const response = await axios.post('/api/v1/auth/sudo', { password });

    const { result } = response.data;

    // 참
    if (result) {
      const next = app[sudo.next];

      // 실행할 앱 없음
      if (!next) {
        initState();
        return [{ session: `sudo: ${sudo.next}`, text: 'command not found' }];
      }

      initState();
      return next({ ...command, sudo });
    // 거짓
    } else {
      initState();
      return [{ session: 'Sorry,', text: 'try again.' }];
    }
  }
}