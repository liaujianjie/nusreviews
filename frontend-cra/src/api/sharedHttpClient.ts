import axios from "axios";

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

export const sharedHttpClient = axios.create({
  baseURL: REACT_APP_BACKEND_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
