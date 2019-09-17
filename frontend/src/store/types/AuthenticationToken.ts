type AuthenticationToken = {
  type: AuthenticationTokenType;
  userId: number;
  // username: string;
  userRole: UserRole;
  iat: number;
  exp: number;
};
