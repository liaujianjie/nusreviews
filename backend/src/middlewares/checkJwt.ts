import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";
import {
  JWT_SIGN_OPTIONS,
  JwtSignedPayload,
  isJwtSignedPayload
} from "../types";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  let payload: object | string;
  try {
    payload = jwt.verify(token, jwtSecret, JWT_SIGN_OPTIONS);
  } catch (error) {
    res.status(401).send();
    console.error("checkJwt failed: invalid jwt");
    return;
  }
  res.locals.jwtPayload = payload as JwtSignedPayload;
  if (isJwtSignedPayload(payload)) {
    next();
  } else {
    res.status(401).send();
    console.error("checkJwt failed: isJwtSignedPayload = false");
  }
};
