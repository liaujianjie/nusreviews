import { validateOrReject } from "class-validator";
import { Response, Request } from "express";
import { getRepository, getManager } from "typeorm";
import { ReviewTemplate } from "../entities/ReviewTemplate";
import { MetricTemplate } from "../entities/MetricTemplate";
import { QuestionTemplate } from "../entities/QuestionTemplate";

export async function create(request: Request, response: Response) {
  try {
    const reviewTemplate = new ReviewTemplate();
    const metricTemplates = await arrayify(
      request.body.metricTemplates,
      MetricTemplate,
      { reviewTemplate: reviewTemplate }
    );
    const questionTemplates = await arrayify(
      request.body.questionTemplates,
      QuestionTemplate,
      { reviewTemplate: reviewTemplate }
    );

    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(reviewTemplate);
      await transactionalEntityManager.save(metricTemplates);
      await transactionalEntityManager.save(questionTemplates);
    });
    // TODO: discard all other ReviewTemplates; there should only be one active at any point of time

    response.status(200).send();
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function index(request: Request, response: Response) {
  try {
    const reviewTemplates = await getRepository(ReviewTemplate).find();
    response.status(200).json(reviewTemplates);
  } catch (error) {
    response.sendStatus(500);
  }
}

export async function show(request: Request, response: Response) {
  try {
    const reviewTemplate = await getRepository(ReviewTemplate).findOneOrFail(
      request.params.id
    );
    response.status(200).json(reviewTemplate);
  } catch (error) {
    response.sendStatus(404);
  }
}

export async function discard(request: Request, response: Response) {
  const result = await getRepository(ReviewTemplate).update(request.params.id, {
    discardedAt: new Date()
  });
  console.error(result);
  response.sendStatus(204);
}

export async function undiscard(request: Request, response: Response) {
  const result = await getRepository(ReviewTemplate).update(request.params.id, {
    discardedAt: undefined
  });
  console.error(result.affected);
  response.sendStatus(200);
}

// TODO turn this into a more generic function
async function arrayify<T, U>(
  source: T[],
  constructor: new () => U,
  args?: any
): Promise<U[]> {
  // Awaiting a Promise.all unrolls all internal promises in the array, throwing necessary errors
  return await Promise.all(
    source.map(async data => {
      const combinedData = { ...data, ...args };
      const val = Object.assign(new constructor(), combinedData);
      await validateOrReject(val);
      return val;
    })
  );
}
