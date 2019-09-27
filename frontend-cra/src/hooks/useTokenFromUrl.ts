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
  const slug =
    splitPathname.length === slugIndex + 1 ? splitPathname[slugIndex]! : "";

  try {
    const decodedToken = decode(slug) as AuthenticationToken;
    return {
      hasValidToken: true,
      encodedToken: slug,
      decodedToken
    };
  } catch (error) {
    return {
      hasValidToken: false
    };
  }
};
