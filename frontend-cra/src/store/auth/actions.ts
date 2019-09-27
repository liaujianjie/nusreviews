import { Dispatch, ActionCreator } from "redux";

import { AuthAction, AuthActionTypes } from "./types";
import * as auth from "../../api/auth";
import {
  saveTokensToLocalStorage,
  clearTokensFromLocalStorage,
  loadTokensFromLocalStorage
} from "./lib/localstorage";
import { setHttpClientAuthToken, unsetHttpClientAuthToken } from "./lib/axios";
import { getTokensFromResponse } from "./utils/getTokensFromResponse";

type SignInParameter = Parameters<typeof auth.signIn>[0];

export const signIn = ({ email, password }: SignInParameter) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: AuthAction.SIGNIN_BEGIN });

  try {
    const response = await auth.signIn({ email, password });
    const tokens = getTokensFromResponse(response);
    saveTokensToLocalStorage(tokens);
    setHttpClientAuthToken(tokens.encodedAccessToken);
    dispatch({
      type: AuthAction.SIGNIN_SUCCESS,
      payload: tokens
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AuthAction.SIGNIN_FAILURE });
  }
};

export const signUp = ({ email, password }: SignInParameter) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: AuthAction.SIGNUP_BEGIN });

  try {
    const response = await auth.signUp({ email, password });
    const tokens = getTokensFromResponse(response);
    saveTokensToLocalStorage(tokens);
    setHttpClientAuthToken(tokens.encodedAccessToken);
    dispatch({
      type: AuthAction.SIGNUP_SUCCESS,
      payload: tokens
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: AuthAction.SIGNUP_FAILURE });
  }
};

export const signOut: ActionCreator<AuthActionTypes> = () => {
  clearTokensFromLocalStorage();
  unsetHttpClientAuthToken();
  return {
    type: AuthAction.SIGNOUT
  };
};

export const loadFromLoadStorage = () => {
  const persistedTokens = loadTokensFromLocalStorage();
  if (!persistedTokens) {
    return {
      type: AuthAction.LOAD_FROM_LOCALSTORAGE
    };
  }

  setHttpClientAuthToken(persistedTokens.encodedAccessToken);

  const mockResponse = {
    accessToken: persistedTokens.encodedAccessToken,
    refreshToken: persistedTokens.encodedRefreshToken
  };
  return {
    type: AuthAction.LOAD_FROM_LOCALSTORAGE,
    payload: getTokensFromResponse(mockResponse)
  };
};
