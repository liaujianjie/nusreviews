import * as qs from "querystring";

import { sharedHttpClient } from "./sharedHttpClient";

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
  const unencodedBody = {
    username: email,
    email,
    password
  };
  const response = await sharedHttpClient.post(
    "/users",
    qs.stringify(unencodedBody)
  );
  return response.data;
};

type RequestPasswordResetPayload = {
  email: string;
};

export const requestPasswordReset = async ({
  email
}: RequestPasswordResetPayload) => {
  const unencodedBody = {
    email
  };
  const response = await sharedHttpClient.post(
    "/request_reset_password",
    qs.stringify(unencodedBody)
  );
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
  const unencodedBody = {
    password
  };
  const response = await sharedHttpClient.post(
    "/request_reset_password",
    qs.stringify(unencodedBody),
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
