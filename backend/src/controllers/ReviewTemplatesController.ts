import { Response, Request } from "express";
import { getRepository, getManager } from "typeorm";
import { MetricTemplate } from "../entities/MetricTemplate";
import { QuestionTemplate } from "../entities/QuestionTemplate";
import { ReviewTemplate } from "../entities/ReviewTemplate";
import { getEntityArray } from "../utils/entities";

export async function create(request: Request, response: Response) {
  try {
    const reviewTemplate = new ReviewTemplate();
    const metricTemplates = await getEntityArray(
      request.body.metricTemplates,
      MetricTemplate,
      { reviewTemplate: reviewTemplate }
    );
    const questionTemplates = await getEntityArray(
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
