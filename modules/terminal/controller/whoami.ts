import { Command } from '../common';

export const whoami = (command: Command): Command[] => {
  const { session, text, running, toSave, args, isSecure, sudo } = command;

  if (sudo) {
    return [{ session: 'root', text: '' }];
  } else {
    return [{ session, text: '' }];
  }
}