import { UserRole, isUserRole } from "./users";

export interface JwtPayload {
  userId: number;
  username: string;
  userRole: UserRole;
}

export interface JwtSignedPayload extends JwtPayload {
  iat: number;
  exp: number;
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
