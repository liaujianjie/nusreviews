import { sharedHttpClient } from "../../../api/sharedHttpClient";

/**
 * Sets the auth header for the shared HTTP client with the provided JWT.
 */
export const setHttpClientAuthToken = (encodedAccessToken: string) => {
  console.log(encodedAccessToken, "token here===================");
  sharedHttpClient.defaults.headers[
    "Authorization"
  ] = `Bearer ${encodedAccessToken}`;
};

/**
 * Removes the auth headers for the shared HTTP client.
 */
export const unsetHttpClientAuthToken = () => {
  delete sharedHttpClient.defaults.headers["Authorization"];
};
