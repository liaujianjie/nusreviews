import { BearerToken } from "./tokens";

export enum UserRole {
  Admin = "ADMIN",
  Student = "STUDENT"
}

export function isUserRole(role: any): role is UserRole {
  return Object.values(UserRole).includes(role);
}

export interface AuthenticationTokens {
  accessToken: BearerToken;
  refreshToken: BearerToken;
}
