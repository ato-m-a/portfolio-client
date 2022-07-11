import { Subject } from 'rxjs';

/* model */
import type { Command } from '../common';

/* middleware */
import { MessageMiddleware } from '../middleware';

// subject
const subject$ = new Subject<Command[] | null>();

export const MessageService = {
  sendCommand: async (command: Command) => {
    const result = await MessageMiddleware({ ...command });
    subject$.next([...result]);
  },
  sendMessage: (command: Command) => subject$.next([{ session: command.session, text: command.text }]),
  onConsole: () => subject$.asObservable()
};