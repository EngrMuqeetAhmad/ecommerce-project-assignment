import { User } from '../../types';

export enum ActionType {
  SetUser,
  LOGOUT,
  // UPDATE
}

export interface SetUser {
  type: ActionType.SetUser;
  payload: { user: User | null };
}

export interface LOGOUT {
  type: ActionType.LOGOUT;
}

export type UserActions = SetUser | LOGOUT;
