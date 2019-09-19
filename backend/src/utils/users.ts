import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import {
  AuthenticationTokens,
  AuthenticationToken,
  JwtPayload
} from "../types/users";

function getJwtString(
  type: AuthenticationToken,
  user: User,
  expiresIn: string | number
): string {
  const payload: JwtPayload = {
    type,
    userId: user.id,
    username: user.username,
    userRole: user.role
  };
  return sign(payload, process.env.JWT_SECRET!, { expiresIn });
}

export function getAuthenticationTokens(user: User): AuthenticationTokens {
  return {
    accessToken: getJwtString(AuthenticationToken.AccessToken, user, "15m"),
    refreshToken: getJwtString(AuthenticationToken.RefreshToken, user, "7d")
  };
}
