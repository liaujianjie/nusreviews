import { Request, Response} from "express";
import { getRepository } from "typeorm";
import { Opinion } from "../entities/Opinion";
import { ModuleSemester } from "../entities/ModuleSemester";
import { generateEditToken, EditTokenSignedPayload } from "../utils/editToken";
import { validateOrReject } from "class-validator";

export const opinionsRepository = () => getRepository(Opinion);

export async function show(request: Request, response: Response) {
  try {
    const moduleSemester = await opinionsRepository().findOneOrFail(
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
    const opinion = new Opinion();
    opinion.moduleSemester = moduleSemester;
    opinion.description = request.body.description;

    await validateOrReject(opinion);
    await opinionsRepository().save(opinion);
    const editToken = generateEditToken(opinion, "120 days");
    const result = {
      opinion,
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

    const opinion = await opinionsRepository().findOneOrFail(id);
    opinion.description = request.body.description;
    await validateOrReject(opinion);
    await opinionsRepository().save(opinion);
    response.status(200).send(opinion);
  } catch (error) {
    response.status(400).send();
  }
}
