import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ModuleSemester } from "../entities/ModuleSemester";
import { Opinion } from "../entities/Opinion";

export const moduleSemesterRepository = () => getRepository(ModuleSemester);

export async function show(request: Request, response: Response) {
  try {
    const moduleSemester = await moduleSemesterRepository().findOneOrFail(
      request.params.id
    );
    response.status(200).send(moduleSemester);
  } catch (error) {
    response.status(400).send();
    return;
  }
}

export async function opinions(request: Request, response: Response) {
  try {
    const moduleSemester = await moduleSemesterRepository().findOneOrFail(
      request.params.id
    );
    const opinions = await getRepository(Opinion).find({
      where: { moduleSemester: moduleSemester }
    });
    response.status(200).send(opinions);
  } catch (error) {
    response.status(400).send();
  }
}
