import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {
  isBearerToken,
  BearerTokenType,
  isAccessTokenSignedPayload,
  isRefreshTokenSignedPayload,
  isEntityTokenSignedPayload
} from "../types/tokens";

export const checkBearerToken = (type: BearerTokenType) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token || !isBearerToken(token)) {
    res.sendStatus(401);
    return;
  }

  let payload: object | string;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    res.sendStatus(401);
    return;
  }

  switch (type) {
    case BearerTokenType.AccessToken:
      if (!isAccessTokenSignedPayload(payload)) {
        res.sendStatus(401);
        return;
      }
      break;

    case BearerTokenType.RefreshToken:
      if (!isRefreshTokenSignedPayload(payload)) {
        res.sendStatus(401);
        return;
      }
      break;

    case BearerTokenType.EntityToken:
      if (!isEntityTokenSignedPayload(payload)) {
        res.sendStatus(401);
        return;
      }
      break;
  }

  res.locals.payload = payload;

  next();
};
