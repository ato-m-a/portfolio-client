import { Command } from '../common';
import { TerminalService } from '../services';
import { ActionService } from '../services';
import axios from 'axios';

export const su = async (command: Command) => {
  const { session, text, running, args, isSecure, toSave, sudo } = command;

  const initState = () => {
    TerminalService.setState(null);
  }

  // args: password 받아야 할 때
  if (running && running === 'su') {
    const username = toSave;
    const password = text;

    try {
      const response = await axios.post('/api/v1/auth/signin', { username, password });
      ActionService.setAction({
        action: 'setUser',
        payload: {
          uuid: response.data.uuid,
          email: response.data.email,
          username: response.data.username,
          role: response.data.role
        }
      });
      initState();
      return [];
    } catch {
      initState();
      return [{ session: 'su:', text: 'Sorry' }];
    }
  // 최초 실행
  } else {
    // sudo = true
    if (sudo) {
      const originCommand = sudo.command;
      const username = originCommand.split(' ').at(2);

      // username 미기입
      if (!username || username === '') {
        initState();
        return [{ session: 'sudo: su:', text: 'Sorry' }];
      }

      if (username === 'guest') {
        await axios.delete('/api/v1/auth/signout');
        ActionService.setAction({ action: 'vacateUser' });
        initState();
        return [];
      }

      try {
        const response = await axios.post('/api/v1/auth/signin/sudo', { username });
        ActionService.setAction({
          action: 'setUser',
          payload: {
            uuid: response.data.uuid,
            email: response.data.email,
            username: response.data.username,
            role: response.data.role
          }
        });
        initState();
        return [];
      } catch {
        initState();
        return [{ session: 'sudo: su:', text: 'Sorry' }];
      }
    } else {
      if (text.split(' ').at(1) === 'guest') {
        ActionService.setAction({ action: 'vacateUser' });
        return [];
      }

      TerminalService.setState({
        running: 'su',
        args: 'password',
        isSecure: true,
        toSave: text.split(' ').at(1)
      });
      return [];
    }
  }
}