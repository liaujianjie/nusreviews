import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Semester } from "../entities/Semester";
import { Module } from "../entities/Module";

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const semester = await getRepository(Semester).find();
    response.status(200).json(semester);
  } catch (error) {
    response.status(400).send();
  }
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const semester = await getRepository(Semester).findOneOrFail(request.params.id);
    response.status(200).json(semester);
  } catch (error) {
    response.status(400).send();
  }
}

export async function modules(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const semester = await getRepository(Semester).findOneOrFail(
      request.params.id,
      {
        relations: ["moduleSemesters", "moduleSemesters.module"]
      }
    );
    const moduleSemesters = semester.moduleSemesters;
    const modules: Module[] = [];
    moduleSemesters.forEach(moduleSemester => {
      modules.push(moduleSemester.module);
    });
    response.status(200).json(modules);
  } catch (error) {
    response.status(400).send();
  }
}
