import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { isJwtSignedPayload, AuthenticationToken } from "../types/users";

export const checkRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send();
    return;
  }

  let payload: object | string;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    res.status(401).send();
    return;
  }

  if (!isJwtSignedPayload(payload)) {
    res.status(401).send();
    return;
  }

  res.locals.jwtPayload = payload;

  if (payload.type !== AuthenticationToken.RefreshToken) {
    res.status(401).send();
    return;
  }

  let user: User;
  try {
    user = await getRepository(User).findOneOrFail(payload.userId);
  } catch (error) {
    res.status(401).send();
    return;
  }

  if (user.discardedAt) {
    res.status(401).send();
    return;
  }

  next();
};
