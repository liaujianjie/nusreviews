import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";
import { JwtSignedPayload, isJwtSignedPayload } from "../types/jwt";
import { JWT_SIGN_OPTIONS } from "../utils/jwt";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token === undefined) {
    res.status(401).send();
    console.error("checkJwt error: undefined token");
    return;
  }

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
