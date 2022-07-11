import { SudoState } from '../services/sudo.service';

export type Command = {
  session: string;
  text: string;
  running?: string;
  toSave?: any;
  args?: string;
  isSecure?: boolean;
  sudo?: SudoState;
}

export type TerminalState = {
  running: string;
  args: string;
  isSecure: boolean;
  toSave?: any;
}

export type ActionState = {
  payload?: any;
  action: any;
}