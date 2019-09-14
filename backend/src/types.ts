import { SignOptions } from "jsonwebtoken";

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student"
}

export interface JwtPayload {
  userId: number;
  username: string;
  userRole: UserRole;
}

export interface JwtSignedPayload extends JwtPayload {
  iat: number;
  exp: number;
}

export function isUserRole(role: any): role is UserRole {
  return Object.values(UserRole).includes(role);
}

export function isJwtPayload(object: any): object is JwtPayload {
  return (
    object.hasOwnProperty("userId") &&
    typeof object.userId === "number" &&
    object.hasOwnProperty("username") &&
    typeof object.username === "string" &&
    object.hasOwnProperty("userRole") &&
    isUserRole(object.userRole)
  );
}

export function isJwtSignedPayload(object: any): object is JwtSignedPayload {
  return (
    object.hasOwnProperty("iat") &&
    typeof object.iat === "number" &&
    object.hasOwnProperty("exp") &&
    typeof object.exp === "number" &&
    isJwtPayload(object)
  );
}

export const JWT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1h"
};
