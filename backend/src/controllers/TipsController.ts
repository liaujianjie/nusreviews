import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Tip } from "../entities/Tip";
import { ModuleSemester } from "../entities/ModuleSemester";
import { generateEditToken, EditTokenSignedPayload } from "../utils/editToken";

export async function create(request: Request, response: Response) {
  try {
    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
      request.params.id
    );
    const tip = new Tip();
    tip.moduleSemester = moduleSemester;
    tip.description = request.body.description;

    await validateOrReject(tip);
    await getRepository(Tip).save(tip);
    const editToken = generateEditToken(tip, "120 days");
    const result = {
      tip,
      editToken
    };
    response.status(201).send(result);
  } catch (error) {
    console.error(error);
    response.status(400).send();
  }
}

export async function show(request: Request, response: Response) {
  try {
    const tip = await getRepository(Tip).findOneOrFail(request.params.id);
    response.status(200).json(tip);
  } catch (error) {
    response.status(400).send();
    return;
  }
}

export async function update(request: Request, response: Response) {
  try {
    const payload = response.locals
      .editTokenSignedPayload as EditTokenSignedPayload;
    const id = payload.entityId;

    const tip = await getRepository(Tip).findOneOrFail(id);
    tip.description = request.body.description;
    await validateOrReject(tip);

    await getRepository(Tip).save(tip);
    response.status(200).json(tip);
  } catch (error) {
    response.status(400).send();
  }
}

// TODO
export async function discard(request: Request, response: Response) {}

export async function undiscard(request: Request, response: Response) {}

export async function votes(request: Request, response: Response) {
  try {
    const tip = await getRepository(Tip).findOneOrFail(request.params.id, {
      relations: ["tipVotes"]
    });
    const votes = tip.tipVotes;
    response.status(200).json(votes);
  } catch (error) {
    response.status(400).send();
  }
}
