import { AuthAction } from "./types";
import * as auth from "../../api/auth";
import {
  saveTokensToLocalStorage,
  clearTokensFromLocalStorage,
  loadTokensFromLocalStorage
} from "./lib/localstorage";
import { getTokensFromResponse } from "./utils/getTokensFromResponse";
import { setHttpClientAuthToken, unsetHttpClientAuthToken } from "./lib/axios";
import { Dispatch } from "redux";

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

export const signOut = () => {
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
