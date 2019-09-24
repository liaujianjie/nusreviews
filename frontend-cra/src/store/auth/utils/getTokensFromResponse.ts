import { AuthState } from "..";
import { getAuthTokenFromJwt } from "./getAuthTokenFromJwt";

/**
 * Returns the access and refresh tokens in encoded and decoded form for a given
 * auth response payload.
 */
export const getTokensFromResponse = (response: any) => {
  const encodedAccessToken = response.accessToken as string;
  const encodedRefreshToken = response.refreshToken as string;
  const accessToken = getAuthTokenFromJwt(encodedAccessToken);
  const refreshToken = getAuthTokenFromJwt(encodedRefreshToken);

  // Guard against invalid JWTs
  if (!accessToken || !refreshToken) {
    throw new Error("Invalid JWT for access token or refresh token.");
  }

  return {
    encodedAccessToken,
    encodedRefreshToken,
    accessToken,
    refreshToken
  };
};
