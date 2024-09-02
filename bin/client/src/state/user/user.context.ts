import { createContext, Dispatch } from 'react';
import { UserState } from '../../types';

import { UserActions } from './user.actions';
export const initialUserState: UserState = {
  isAuthenticated: false,
  user: null,
};

export const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserActions>;
}>({
  state: initialUserState,
  dispatch: () => undefined,
});
