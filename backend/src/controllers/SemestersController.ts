import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Semester } from "../entities/Semester";

export const semesterRepository = () => getRepository(Semester);

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await semesterRepository().find();
  } catch (error) {
    response.status(400).send();
    return;
  }
  response.status(200).send(result);
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await semesterRepository().findOneOrFail(request.params.id);
  } catch (error) {
    response.status(400).send();
    return;
  }
  response.status(200).send(result);
}
