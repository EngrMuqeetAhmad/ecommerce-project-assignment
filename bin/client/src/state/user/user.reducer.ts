import { UserState } from '../../types';
import { ActionType, UserActions } from './user.actions';

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case ActionType.SetUser:
      const { user } = action.payload;

      if (user != null) {
        return {
          ...state,
          isAuthenticated: true,
          user,
        };
      } else {
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      }
      break;
    case ActionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return { ...state };
  }
}
