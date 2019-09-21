import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { TipVote } from "../entities/TipVote";
import { validateOrReject } from "class-validator";
import { JwtSignedPayload } from "../types/users";
import { User } from "../entities/User";
import { Tip } from "../entities/Tip";

export async function create(request: Request, response: Response) {
  try {
    const tipVote = new TipVote();
    const payload = response.locals.jwtPayload as JwtSignedPayload;
    tipVote.user = await getRepository(User).findOneOrFail(payload.userId);
    tipVote.tip = await getRepository(Tip).findOneOrFail(request.params.id);
    tipVote.value = parseInt(request.body.value);
    await validateOrReject(tipVote);
    await getRepository(TipVote).save(tipVote);
    
    response.status(201).send(tipVote);
  } catch (error) {
    console.error(error);
    response.status(400).send();
  }
}

export async function show(request: Request, response: Response) {
  try {
    const tipVote = await getRepository(TipVote).findOneOrFail(request.params.id);
    response.status(200).json(tipVote);
  } catch (error) {
    response.status(400).send();
  }
}

export async function update(request: Request, response: Response) {
  try {
    const tipVote = await getRepository(TipVote).findOneOrFail(request.params.id);
    tipVote.value = parseInt(request.body.value);
    await validateOrReject(tipVote);
    await getRepository(TipVote).save(tipVote);
    response.status(200).json(tipVote);
  } catch (error) {
    response.status(400).send();
  }
}

export async function destroy(request: Request, response: Response) {
  try {
    const result = await getRepository(TipVote).delete(request.params.id);
    if (result.affected === 0) {
      throw new Error("Invalid tipVote.id");
    }
    response.status(200).json(result);
  } catch (error) {
    response.status(400).send();
  }
}
