import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Semester } from "../entities/Semester";
import { Module } from "../entities/Module";

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

export async function modules(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const semester = await semesterRepository().findOneOrFail(
      request.params.id,
      {
        relations: ["moduleSemesters", "moduleSemesters.module"]
      }
    );
    const moduleSemesters = semester.moduleSemesters;
    if (!moduleSemesters) {
      response.status(200).send([]);
      return;
    }
    const modules: Module[] = [];
    moduleSemesters.forEach(moduleSemester => {
      modules.push(moduleSemester.module);
    });
    response.status(200).send(modules);
  } catch (error) {
    response.status(400).send();
    return;
  }
}
