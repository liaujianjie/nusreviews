import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { Question } from "../entities/Question";

export async function update(request: Request, response: Response) {}

export async function discard(request: Request, response: Response) {
  try {
    const result = await getRepository(Question).update(request.params.id, {
      discardedAt: new Date()
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function undiscard(request: Request, response: Response) {
  try {
    const result = await getRepository(Question).update(request.params.id, {
      discardedAt: undefined
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}
