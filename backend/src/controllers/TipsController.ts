import { Request, Response, response } from "express";
import { getRepository } from "typeorm";
import { Tip } from "../entities/Tip";
import { ModuleSemester } from "../entities/ModuleSemester";
import { generateEditToken, EditTokenSignedPayload } from "../utils/editToken";
import { validateOrReject } from "class-validator";

export const tipsRepository = () => getRepository(Tip);

export async function show(request: Request, response: Response) {
  try {
    const moduleSemester = await tipsRepository().findOneOrFail(
      request.params.id
    );
    response.status(200).send(moduleSemester);
  } catch (error) {
    response.status(400).send();
    return;
  }
}

export async function create(request: Request, response: Response) {
  try {
    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
      request.params.id
    );
    const tip = new Tip();
    tip.moduleSemester = moduleSemester;
    tip.description = request.body.description;

    await validateOrReject(tip);
    await tipsRepository().save(tip);
    const editToken = generateEditToken(tip, "120 days");
    const result = {
      tip,
      editToken
    };
    response.status(200).send(result);
  } catch (error) {
    console.error(error);
    response.status(400).send();
  }
}

export async function update(request: Request, response: Response) {
  try {
    const payload = response.locals
      .editTokenSignedPayload as EditTokenSignedPayload;
    const id = payload.entityId;

    const tip = await tipsRepository().findOneOrFail(id);
    tip.description = request.body.description;
    await validateOrReject(tip);

    await tipsRepository().save(tip);
    response.status(200).send(tip);
  } catch (error) {
    response.status(400).send();
  }
}
