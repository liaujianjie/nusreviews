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
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.username
  };

  const refreshTokenPayload: RefreshTokenPayload = {
    type: BearerTokenType.RefreshToken,
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.username
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
