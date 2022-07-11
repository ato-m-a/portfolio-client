import { Subject } from 'rxjs';
import type { ActionState } from '../common';

const subject$ = new Subject<ActionState | null>();

export const ActionService = {
  setAction: (dataset: ActionState) => subject$.next({ ...dataset }),
  clearAction: () => subject$.next(null),
  onAction: () => subject$.asObservable()
}