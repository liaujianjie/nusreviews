import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { OpinionVote } from "../entities/OpinionVote";
import { validateOrReject } from "class-validator";
import { JwtSignedPayload } from "../types/users";
import { User } from "../entities/User";
import { Opinion } from "../entities/Opinion";

export async function create(request: Request, response: Response) {
  try {
    const opinionVote = new OpinionVote();
    const payload = response.locals.jwtPayload as JwtSignedPayload;
    opinionVote.user = await getRepository(User).findOneOrFail(payload.userId);
    opinionVote.opinion = await getRepository(Opinion).findOneOrFail(request.params.id);
    opinionVote.value = parseInt(request.body.value);
    await validateOrReject(opinionVote);
    await getRepository(OpinionVote).save(opinionVote);
    response.status(201).send(opinionVote);
  } catch (error) {
    console.error(error);
    response.status(400).send();
  }
}

export async function show(request: Request, response: Response) {
  try {
    const opinionVote = await getRepository(OpinionVote).findOneOrFail(request.params.id);
    response.status(200).send(opinionVote);
  } catch (error) {
    response.status(400).send();
  }
}

export async function destroy(request: Request, response: Response) {
  try {
    const result = await getRepository(OpinionVote).delete(request.params.id);
    if (result.affected === 0) {
      throw new Error("Invalid opinionVote.id");
    }
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send();
  }
}

export async function update(request: Request, response: Response) {
  try {
    const opinionVote = await getRepository(OpinionVote).findOneOrFail(request.params.id);
    opinionVote.value = parseInt(request.body.value);
    await validateOrReject(opinionVote);
    await getRepository(OpinionVote).save(opinionVote);
    response.status(200).send(opinionVote);
  } catch (error) {
    response.status(400).send();
  }
}
