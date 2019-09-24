import { AuthState, AuthActionTypes, AuthAction } from "./types";

export const INITIAL_STATE: AuthState = {
  encodedAccessToken: null,
  encodedRefreshToken: null,
  accessToken: null,
  refreshToken: null,
  authenticating: true
};

export const reducer = (
  state: AuthState = { ...INITIAL_STATE },
  action: AuthActionTypes
) => {
  switch (action.type) {
    case AuthAction.SIGNIN_BEGIN:
    case AuthAction.SIGNUP_BEGIN:
      return { ...state, authenticating: true };
    case AuthAction.SIGNIN_SUCCESS:
    case AuthAction.SIGNUP_SUCCESS:
      return { ...action.payload, authenticating: false };
    case AuthAction.LOAD_FROM_LOCALSTORAGE:
      return { ...state, ...action.payload, authenticating: false };
    case AuthAction.SIGNIN_FAILURE:
    case AuthAction.SIGNUP_FAILURE:
    case AuthAction.SIGNOUT:
      return { ...INITIAL_STATE, authenticating: false };
    default:
      return state;
  }
};
