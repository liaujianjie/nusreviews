import * as _ from "lodash";
import * as qs from "querystring";

import { sharedHttpClient } from "./sharedHttpClient";

type AuthCredentials = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: AuthCredentials) => {
  const decodedCredentials = `${email}:${password}`;
  const encodedCredentials = btoa(decodedCredentials);
  const response = await sharedHttpClient.post("/users/login", null, {
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
    qs.stringify(unencodedBody),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
  return response.data;
};
