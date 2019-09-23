import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import { AuthenticationTokens } from "../types/users";
import {
  AccessTokenPayload,
  BearerTokenType,
  RefreshTokenPayload
} from "../types/tokens";

export function getAuthenticationTokens(user: User): AuthenticationTokens {
  const accessTokenPayload: AccessTokenPayload = {
    type: BearerTokenType.AccessToken,
    userId: user.id,
    username: user.username,
    userRole: user.role
  };

  const refreshTokenPayload: RefreshTokenPayload = {
    type: BearerTokenType.RefreshToken,
    userId: user.id,
    username: user.username,
    userRole: user.role
  };

  return {
    accessToken: sign(accessTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "15m"
    }),
    refreshToken: sign(refreshTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    })
  };
}
