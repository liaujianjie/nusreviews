import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Module } from "../entities/Module";
import { Semester } from "../entities/Semester";

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await getRepository(Module).find();
    // TODO: need to cut this down to send a more condensed version
    response.status(200).send(result);
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
    const module = await getRepository(Module).findOneOrFail({
      where: { moduleCode: request.params.module_code }
    });
    response.status(200).send(module);
  } catch (error) {
    response.status(400).send();
  }
}

export async function semesters(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const module = await getRepository(Module).findOneOrFail({
      where: { moduleCode: request.params.module_code },
      relations: ["moduleSemesters", "moduleSemesters.semester"]
    });
    const moduleSemesters = module.moduleSemesters;
    const semesters: Semester[] = [];
    moduleSemesters.forEach(moduleSemester => {
      semesters.push(moduleSemester.semester);
    });
    response.status(200).send(semesters);
  } catch (error) {
    response.status(400).send();
  }
}

export async function moduleSemesters(request: Request, response: Response) {
  try {
    const module = await getRepository(Module).findOneOrFail({
      where: { moduleCode: request.params.module_code },
      relations: ["moduleSemesters"]
    });
    const moduleSemesters = module.moduleSemesters;
    response.status(200).send(moduleSemesters);
  } catch (error) {
    response.status(400).send();
  }
}
