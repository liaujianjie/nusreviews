import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { OpinionVote } from "../entities/OpinionVote";
import { validateOrReject } from "class-validator";
import { User } from "../entities/User";
import { Opinion } from "../entities/Opinion";
import { AccessTokenSignedPayload } from "../types/tokens";

export async function create(request: Request, response: Response) {
  try {
    const opinionVote = new OpinionVote();
    const payload = response.locals.payload as AccessTokenSignedPayload;
    opinionVote.user = await getRepository(User).findOneOrFail(payload.userId);
    opinionVote.opinion = await getRepository(Opinion).findOneOrFail(
      request.params.id
    );
    opinionVote.value = parseInt(request.body.value);
    await validateOrReject(opinionVote);
    await getRepository(OpinionVote).save(opinionVote);
    response.status(201).send(opinionVote);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function show(request: Request, response: Response) {
  try {
    const opinionVote = await getRepository(OpinionVote).findOneOrFail(
      request.params.id
    );
    response.status(200).json(opinionVote);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function update(request: Request, response: Response) {
  try {
    const opinionVote = await checkUser(request, response);
    opinionVote.value = parseInt(request.body.value);
    await validateOrReject(opinionVote);
    await getRepository(OpinionVote).save(opinionVote);
    response.status(200).json(opinionVote);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function destroy(request: Request, response: Response) {
  try {
    await checkUser(request, response);
    const result = await getRepository(OpinionVote).delete(request.params.id);
    if (result.affected === 0) {
      throw new Error("Failed to destroy");
    }
    response.status(200).json(result);
  } catch (error) {
    response.sendStatus(400);
  }
}

async function checkUser(request: Request, response: Response) {
  const payload = response.locals.payload as AccessTokenSignedPayload;
  const opinionVote = await getRepository(OpinionVote).findOneOrFail(
    request.params.id,
    {
      relations: ["user"]
    }
  );
  if (payload.userId !== opinionVote.user.id) {
    throw new Error("Invalid user");
  }
  return opinionVote;
}
