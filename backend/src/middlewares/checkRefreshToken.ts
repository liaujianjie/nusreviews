import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";
import { isJwtSignedPayload, AuthenticationToken } from "../types/users";

export const checkRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (token === undefined) {
    res.status(401).send();
    return;
  }

  let payload: object | string;
  try {
    payload = jwt.verify(token, jwtSecret);
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

  // TODO: Check if user is banned

  next();
};