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
  const token = req.params.editToken;
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

  if (!isEditTokenSignedPayload(payload)) {
    res.status(401).send();
    return;
  }

  res.locals.editTokenSignedPayload = payload;
  if (Object.values(EditableEntityType).includes(payload.type)) {
    next();
  } else {
    res.status(401).send();
  }
};
