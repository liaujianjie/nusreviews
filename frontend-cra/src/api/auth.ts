import { sharedHttpClient } from "./sharedHttpClient";
import {
  loadTokensFromLocalStorage,
  saveTokensToLocalStorage
} from "../store/auth/lib/localstorage";

type AuthCredentials = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: AuthCredentials) => {
  const decodedCredentials = `${email}:${password}`;
  const encodedCredentials = btoa(decodedCredentials);
  const response = await sharedHttpClient.post("/login", null, {
    headers: { Authorization: `Basic ${encodedCredentials}` }
  });
  return response.data;
};

export const signUp = async ({ email, password }: AuthCredentials) => {
  const response = await sharedHttpClient.post("/users", {
    username: email,
    email,
    password
  });
  return response.data;
};

type RequestPasswordResetPayload = {
  email: string;
};

export const requestPasswordReset = async ({
  email
}: RequestPasswordResetPayload) => {
  const response = await sharedHttpClient.post("/request_reset_password", {
    email
  });
  return response.data;
};

type ResetPasswordPayload = {
  token: string;
  password: string;
};

export const resetPassword = async ({
  token,
  password
}: ResetPasswordPayload) => {
  const response = await sharedHttpClient.post(
    "/reset_password",
    { newPassword: password },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

type VerifyEmailPayload = {
  token: string;
};

export const verifyEmail = async ({ token }: VerifyEmailPayload) => {
  const response = await sharedHttpClient.post("/verify_email", null, {
    headers: { Authorization: `Bearer ${token}` }
  });
  await refreshSession();
  return response.data;
};

export const refreshSession = async () => {
  const tokens = loadTokensFromLocalStorage();

  if (!tokens) {
    // TODO: handle this better
    console.log("No refresh token to refresh the session!");
    return;
  }

  const response = await sharedHttpClient.post(
    "/refresh_authentication",
    null,
    { headers: { Authorization: `Bearer ${tokens.encodedRefreshToken}` } }
  );

  // Ensure the tokens are actually there
  if (
    !response ||
    !response.data ||
    response.data.accessToken ||
    response.data.refreshToken
  ) {
    return;
  }

  // Set auth header
  sharedHttpClient.defaults.headers[
    "Authorization"
  ] = `Bearer ${response.data.accessToken}`;
  // Persist to localstorage
  saveTokensToLocalStorage({
    encodedAccessToken: response.data.accessToken,
    encodedRefreshToken: response.data.refreshToken
  });
};
