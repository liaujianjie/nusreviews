import { useContext } from "react";
import { __RouterContext as RouterContext } from "react-router";

/**
 * Wrapper around a private API so that we can access the router with a hook.
 */
export const useRouter = () => {
  return useContext(RouterContext);
};
