import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { Tip } from "../entities/Tip";
import { ModuleSemester } from "../entities/ModuleSemester";
import { EntityTokenSignedPayload } from "../types/tokens";

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

    const payload = tip.createPayload();

    const entityToken = sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "120 days"
    });

    const result = {
      tip,
      entityToken
    };
    response.status(201).json(result);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function show(request: Request, response: Response) {
  try {
    const tip = await getRepository(Tip).findOneOrFail(request.params.id);
    response.status(200).json(tip);
  } catch (error) {
    response.sendStatus(400);
    return;
  }
}

export async function update(request: Request, response: Response) {
  try {
    const entityTokenSignedPayload = response.locals
      .payload as EntityTokenSignedPayload<Tip>;

    const tip = await getRepository(Tip).findOneOrFail(
      entityTokenSignedPayload.id
    );
    tip.description = request.body.description;
    await validateOrReject(tip);

    await getRepository(Tip).save(tip);
    response.status(200).json(tip);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function discard(request: Request, response: Response) {
  try {
    const result = await getRepository(Tip).update(request.params.id, {
      discardedAt: new Date()
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function undiscard(request: Request, response: Response) {
  try {
    const result = await getRepository(Tip).update(request.params.id, {
      discardedAt: undefined
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function votes(request: Request, response: Response) {
  try {
    const tip = await getRepository(Tip).findOneOrFail(request.params.id, {
      relations: ["tipVotes"]
    });
    const votes = tip.tipVotes;
    response.status(200).json(votes);
  } catch (error) {
    response.sendStatus(400);
  }
}
