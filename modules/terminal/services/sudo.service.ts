import { Subject } from 'rxjs';

export type SudoState = {
  next: string;
  command: string;
}

const subject$ = new Subject<SudoState | null>();

export const SudoService = {
  setState: (state: SudoState) => subject$.next({ ...state }),
  clearState: () => subject$.next(null),
  onSudo: () => subject$.asObservable()
};
