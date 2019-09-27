import { decode } from "jsonwebtoken";
import _ from "lodash";

import { AuthenticationToken } from "../store/auth";
import { useRouter } from "./useRouter";

type TokenFromUrl = {
  hasValidToken: boolean;
  encodedToken?: string;
  decodedToken?: AuthenticationToken;
};

export const useTokenFromUrl = (slugIndex: number): TokenFromUrl => {
  const { location } = useRouter();
  const splitPathname = _.split(location.pathname, "/");

  if (splitPathname.length < slugIndex + 1) {
    return {
      hasValidToken: false
    };
  }

  const slug = splitPathname[slugIndex]!;

  const decodedToken = decode(slug) as AuthenticationToken;
  if (!decodedToken) {
    return {
      hasValidToken: false
    };
  }

  return {
    hasValidToken: true,
    encodedToken: slug,
    decodedToken
  };
};
