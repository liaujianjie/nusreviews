import * as JWT from "jsonwebtoken";
import { isAuthenticationToken, AuthenticationToken } from "../types";

/**
 * Returns a decoded `AuthenticationToken` for a given JWT if decodable and
 * valid, otherwise returns `undefined`.
 */
export const getAuthTokenFromJwt = (
  encodedToken: string
): AuthenticationToken | undefined => {
  let decodedToken;

  // Guard against undecodable JWT
  try {
    decodedToken = JWT.decode(encodedToken);
  } catch (error) {
    return;
  }

  // Guard against decodable JWT that is not an authentication token
  if (!isAuthenticationToken(decodedToken)) {
    return;
  }

  return decodedToken;
};
