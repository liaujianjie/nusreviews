import { Response, Request } from "express";
import { getRepository, getManager, IsNull } from "typeorm";
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
      await transactionalEntityManager.update(
        ReviewTemplate,
        { discardedAt: IsNull() },
        { discardedAt: new Date() }
      );
      await transactionalEntityManager.update(
        MetricTemplate,
        { discardedAt: IsNull() },
        { discardedAt: new Date() }
      );
      await transactionalEntityManager.update(
        QuestionTemplate,
        { discardedAt: IsNull() },
        { discardedAt: new Date() }
      );
      await transactionalEntityManager.save(reviewTemplate);
      await transactionalEntityManager.save(metricTemplates);
      await transactionalEntityManager.save(questionTemplates);
    });
    response.status(201).send(reviewTemplate);
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
  try {
    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.update(
        ReviewTemplate,
        {
          discardedAt: IsNull(),
          id: request.params.id
        },
        { discardedAt: new Date() }
      );
      await transactionalEntityManager.update(
        MetricTemplate,
        {
          discardedAt: IsNull(),
          reviewTemplate: { id: request.params.id }
        },
        { discardedAt: new Date() }
      );
      await transactionalEntityManager.update(
        QuestionTemplate,
        {
          discardedAt: IsNull(),
          reviewTemplate: { id: request.params.id }
        },
        { discardedAt: new Date() }
      );
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function undiscard(request: Request, response: Response) {
  try {
    await getManager().transaction(async transactionalEntityManager => {
      // Discard existing
      await transactionalEntityManager.update(
        ReviewTemplate,
        { discardedAt: IsNull() },
        { discardedAt: new Date() }
      );
      await transactionalEntityManager.update(
        MetricTemplate,
        { discardedAt: IsNull() },
        { discardedAt: new Date() }
      );
      await transactionalEntityManager.update(
        QuestionTemplate,
        { discardedAt: IsNull() },
        { discardedAt: new Date() }
      );

      // Undiscard selected
      await transactionalEntityManager.update(
        ReviewTemplate,
        { id: request.params.id },
        { discardedAt: undefined }
      );
      await transactionalEntityManager.update(
        MetricTemplate,
        { reviewTemplate: { id: request.params.id } },
        { discardedAt: undefined }
      );
      await transactionalEntityManager.update(
        QuestionTemplate,
        { reviewTemplate: { id: request.params.id } },
        { discardedAt: undefined }
      );
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}
