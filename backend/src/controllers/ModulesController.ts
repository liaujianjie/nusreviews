import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Module } from "../entities/Module";

export const modulesRepository = () => getRepository(Module);

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await modulesRepository().find();
    // need to cut this down to send a more condensed version
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send();
    return;
  }
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const module = await modulesRepository().findOneOrFail({
      where: { moduleCode: request.params.module_code }
    });
    response.status(200).send(module);
  } catch (error) {
    response.status(400).send();
    return;
  }
}

export async function semesters(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const module = await modulesRepository().findOneOrFail(request.params.id, {
      relations: ["semesters"]
    });
    response.status(200).send(module.semesters);
  } catch (error) {
    response.status(400).send();
    return;
  }
}
