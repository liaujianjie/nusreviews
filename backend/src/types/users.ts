export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student"
}

export function isUserRole(role: any): role is UserRole {
  return Object.values(UserRole).includes(role);
}
