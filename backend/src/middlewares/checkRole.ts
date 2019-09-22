import { Request, Response, NextFunction } from "express";
import { UserRole, JwtSignedPayload } from "../types/users";

export const checkRole = (roles: Array<UserRole>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const payload = res.locals.jwtPayload as JwtSignedPayload;
    const userRole = payload.userRole;

    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).send();
    }
  };
};
