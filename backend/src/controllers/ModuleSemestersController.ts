import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ModuleSemester } from "../entities/ModuleSemester";
import { Opinion } from "../entities/Opinion";
import { Tip } from "../entities/Tip";

export async function show(request: Request, response: Response) {
  try {
    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
      request.params.id
    );
    response.status(200).send(moduleSemester);
  } catch (error) {
    response.status(400).send();
  }
}

export async function opinions(request: Request, response: Response) {
  try {
    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
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

export async function tips(request: Request, response: Response) {
  try {
    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
      request.params.id
    );
    const tips = await getRepository(Tip).find({
      where: { moduleSemester: moduleSemester }
    });
    response.status(200).send(tips);
  } catch (error) {
    response.status(400).send();
  }
}
