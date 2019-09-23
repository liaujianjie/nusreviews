import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import {
  isEditTokenSignedPayload,
  EditableEntityType
} from "../utils/editToken";

export const checkEditToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }
  const arr = req.headers.authorization.split(" ");
  if (arr[0] !== "Bearer" || !arr[1]) {
    res.sendStatus(401);
    return;
  }

  const token = arr[1];
  let payload: object | string;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    res.sendStatus(401);
    return;
  }

  if (!isEditTokenSignedPayload(payload)) {
    res.sendStatus(401);
    return;
  }

  res.locals.editTokenSignedPayload = payload;
  if (Object.values(EditableEntityType).includes(payload.type)) {
    next();
  } else {
    res.sendStatus(401);
  }
};
