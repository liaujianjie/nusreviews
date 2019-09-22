export enum UserRole {
  Admin = "ADMIN",
  Student = "STUDENT"
}

export function isUserRole(role: any): role is UserRole {
  return Object.values(UserRole).includes(role);
}

export enum AuthenticationToken {
  AccessToken = "ACCESS_TOKEN",
  RefreshToken = "REFRESH_TOKEN"
}

export interface AuthenticationTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  type: AuthenticationToken;
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
