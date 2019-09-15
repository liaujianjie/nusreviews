import { sign, SignOptions } from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";
import { User } from "../entities/User";
import { JwtPayload } from "../types/jwt";

export function getJwtString(user: User): string {
  const payload: JwtPayload = {
    userId: user.id,
    username: user.username,
    userRole: user.role
  };
  return sign(payload, jwtSecret, JWT_SIGN_OPTIONS);
}

export const JWT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1h"
};
