import * as JWT from "jsonwebtoken";

import {
  AuthState,
  AuthActionTypes,
  AuthAction,
  isAuthenticationToken
} from "./types";
import * as auth from "../../api/auth";
import { Dispatch, ActionCreator } from "react-redux";

type SignInParameter = Parameters<typeof auth.signIn>[0];

export const signIn = ({ email, password }: SignInParameter) => async (
  dispatch: Dispatch<AuthState>
) => {
  dispatch({ type: AuthAction.SIGNIN_BEGIN });

  try {
    const response = await auth.signIn({ email, password });
    dispatch({
      type: AuthAction.SIGNIN_SUCCESS,
      payload: getAuthStateFromAuthResponse(response)
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AuthAction.SIGNIN_FAILURE });
  }
};

export const signUp = ({ email, password }: SignInParameter) => async (
  dispatch: Dispatch<AuthState>
) => {
  dispatch({ type: AuthAction.SIGNUP_BEGIN });

  try {
    const response = await auth.signUp({ email, password });
    dispatch({
      type: AuthAction.SIGNUP_SUCCESS,
      payload: getAuthStateFromAuthResponse(response)
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AuthAction.SIGNUP_FAILURE });
  }
};

export const signOut: ActionCreator<AuthActionTypes> = () => ({
  type: AuthAction.SIGNOUT
});

const getAuthStateFromAuthResponse = (
  response: any
): Pick<
  AuthState,
  "encodedAccessToken" | "encodedRefreshToken" | "accessToken" | "refreshToken"
> => {
  const encodedAccessToken = response.accessToken as string;
  const encodedRefreshToken = response.refreshToken as string;
  const accessToken = JWT.decode(encodedAccessToken);
  const refreshToken = JWT.decode(encodedRefreshToken);

  if (
    !isAuthenticationToken(accessToken) ||
    !isAuthenticationToken(refreshToken)
  ) {
    throw new Error("Invalid JWT for access token or refresh token.");
  }

  return {
    encodedAccessToken,
    encodedRefreshToken,
    accessToken,
    refreshToken
  };
};
