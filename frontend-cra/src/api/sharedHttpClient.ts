import Axios from "axios";
import * as Rax from "retry-axios";

import { refreshSession } from "./auth";

/**
 * React environment variables must be pefixed with `REACT_APP`.
 *
 * See: https://create-react-app.dev/docs/adding-custom-environment-variables
 */

const { REACT_APP_BACKEND_BASE_URL } = process.env;
if (!REACT_APP_BACKEND_BASE_URL) {
  throw new Error(
    "REACT_APP_BACKEND_BASE_URL environment variable not provided!"
  );
}

export const sharedHttpClient = Axios.create({
  baseURL: REACT_APP_BACKEND_BASE_URL,
  timeout: 10000,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded"
    "Content-Type": "application/json"
  }
});

// We need to cast the type because the `retry-axios` package does not extend
// the `AxiosRequestConfig` type.
// See: https://github.com/JustinBeckwith/retry-axios/issues/64
(sharedHttpClient.defaults as { raxConfig: Rax.RetryConfig }).raxConfig = {
  instance: sharedHttpClient,
  retry: 3,
  onRetryAttempt: async () => {
    await refreshSession();
  }
};

Rax.attach(sharedHttpClient);
