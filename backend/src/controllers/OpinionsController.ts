import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Opinion } from "../entities/Opinion";
import { ModuleSemester } from "../entities/ModuleSemester";
import {
  EntityTokenSignedPayload,
  AccessTokenSignedPayload
} from "../types/tokens";
import { sign } from "jsonwebtoken";
import { sendEntityEmail } from "../utils/sendgrid";

export async function create(request: Request, response: Response) {
  try {
    const accessTokenSignedPayload = response.locals
      .payload as AccessTokenSignedPayload;

    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
      request.params.id
    );
    const opinion = new Opinion();
    opinion.moduleSemester = moduleSemester;
    opinion.description = request.body.description;

    await validateOrReject(opinion);
    await getRepository(Opinion).save(opinion);

    const entityTokenPayload = opinion.createPayload();
    const entityToken = sign(entityTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "120 days"
    });
    const result = {
      opinion,
      entityToken
    };
    sendEntityEmail(accessTokenSignedPayload, opinion, entityToken);
    response.status(201).json(result);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function show(request: Request, response: Response) {
  try {
    const moduleSemester = await getRepository(Opinion).findOneOrFail(
      request.params.id
    );
    response.status(200).json(moduleSemester);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function update(request: Request, response: Response) {
  try {
    const entityTokenSignedPayload = response.locals
      .payload as EntityTokenSignedPayload<Opinion>;

    const opinion = await getRepository(Opinion).findOneOrFail(
      entityTokenSignedPayload.id
    );
    opinion.description = request.body.description;
    await validateOrReject(opinion);
    await getRepository(Opinion).save(opinion);
    response.status(200).json(opinion);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function discard(request: Request, response: Response) {
  try {
    const result = await getRepository(Opinion).update(request.params.id, {
      discardedAt: new Date()
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function undiscard(request: Request, response: Response) {
  try {
    const result = await getRepository(Opinion).update(request.params.id, {
      discardedAt: undefined
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function votes(request: Request, response: Response) {
  try {
    const opinion = await getRepository(Opinion).findOneOrFail(
      request.params.id,
      {
        relations: ["opinionVotes"]
      }
    );
    const votes = opinion.opinionVotes;
    response.status(200).json(votes);
  } catch (error) {
    response.sendStatus(400);
  }
}
