import { ThunkAction } from "redux-thunk";
import * as JWT from "jsonwebtoken";

import {
  AuthState,
  AuthActionTypes,
  AuthAction,
  isAuthenticationToken
} from "./types";
import * as auth from "../../api/auth";
import { Dispatch } from "react-redux";

type SignInParameter = Parameters<typeof auth.signIn>[0];

export const signIn = ({ email, password }: SignInParameter) => async (
  dispatch: Dispatch<AuthState>
) => {
  dispatch({ type: AuthAction.SIGNIN_BEGIN });

  try {
    const response = await auth.signIn({ email, password });
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

    dispatch({
      type: AuthAction.SIGNIN_SUCCESS,
      payload: {
        encodedAccessToken,
        encodedRefreshToken,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AuthAction.SIGNIN_FAILURE });
  }
};
