import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { TipVote } from "../entities/TipVote";
import { validateOrReject } from "class-validator";
import { User } from "../entities/User";
import { Tip } from "../entities/Tip";
import { AccessTokenSignedPayload } from "../types/tokens";

export async function create(request: Request, response: Response) {
  try {
    const tipVote = new TipVote();
    const payload = response.locals.payload as AccessTokenSignedPayload;
    tipVote.user = await getRepository(User).findOneOrFail(payload.userId);
    tipVote.tip = await getRepository(Tip).findOneOrFail(request.params.id);
    tipVote.value = parseInt(request.body.value);
    await validateOrReject(tipVote);
    await getRepository(TipVote).save(tipVote);

    response.status(201).send(tipVote);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function show(request: Request, response: Response) {
  try {
    const tipVote = await getRepository(TipVote).findOneOrFail(
      request.params.id
    );
    response.status(200).json(tipVote);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function update(request: Request, response: Response) {
  try {
    const tipVote = await checkUser(request, response);
    tipVote.value = parseInt(request.body.value);
    await validateOrReject(tipVote);
    await getRepository(TipVote).save(tipVote);
    response.status(200).json(tipVote);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function destroy(request: Request, response: Response) {
  try {
    await checkUser(request, response);
    const result = await getRepository(TipVote).delete(request.params.id);
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
  const tipVote = await getRepository(TipVote).findOneOrFail(
    request.params.id,
    {
      relations: ["user"]
    }
  );
  if (payload.userId !== tipVote.user.id) {
    throw new Error("Invalid user");
  }
  return tipVote;
}
