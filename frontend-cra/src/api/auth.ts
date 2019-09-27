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
  return response.data;
};
