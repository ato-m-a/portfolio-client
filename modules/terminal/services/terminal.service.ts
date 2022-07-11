import { Subject } from 'rxjs';

/* model */
import type { TerminalState } from '../common';

const subject$ = new Subject<TerminalState | null>();

export const TerminalService = {
  setState: (state: TerminalState) => subject$.next({ ...state }),
  clearState: () => subject$.next(null),
  onTerminal: () => subject$.asObservable()
};