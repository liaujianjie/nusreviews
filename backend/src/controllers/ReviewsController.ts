import { validateOrReject } from "class-validator";
import { Response, Request } from "express";
import { getRepository, IsNull } from "typeorm";
import { Metric } from "../entities/Metric";
import { ModuleSemester } from "../entities/ModuleSemester";
import { ReviewTemplate } from "../entities/ReviewTemplate";
import { Question } from "../entities/Question";
import { Review } from "../entities/Review";
import { generateEditToken } from "../utils/editToken";
import { getEntityArray } from "../utils/entities";

export async function create(request: Request, response: Response) {
  try {
    const reviewTemplate = await getRepository(ReviewTemplate).findOneOrFail({
      discardedAt: IsNull()
    });
    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
      request.params.id
    );
    const review = new Review();
    review.reviewTemplate = reviewTemplate;
    review.moduleSemester = moduleSemester;
    review.expectedGrade = request.body.expectedGrade;
    review.actualGrade = request.body.actualGrade;
    await validateOrReject(review);

    review.metrics = await getEntityArray(request.body.metrics, Metric, {
      review: review
    });
    review.questions = await getEntityArray(request.body.questions, Question, {
      review: review
    });

    // metrics and questions are saved by cascade
    await getRepository(Review).save(review);
    const editToken = generateEditToken(review, "120 days");
    const result = {
      review: review.stringify(),
      editToken
    };
    console.log(result);
    response.status(201).json(result);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function show(request: Request, response: Response) {
  try {
    const review = await getRepository(Review).findOneOrFail(
      request.params.id,
      { relations: ["metrics", "questions"] }
    );
    response.status(200).json(review.stringify());
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function update(request: Request, response: Response) {}

export async function discard(request: Request, response: Response) {
  try {
    const review = await getRepository(Review).findOneOrFail(
      request.params.id,
      { relations: ["metrics", "questions"] }
    );
    const discardedAt = new Date();
    review.discardedAt = discardedAt;
    review.metrics.forEach(metric => (metric.discardedAt = discardedAt));
    review.questions.forEach(question => (question.discardedAt = discardedAt));
    await getRepository(Review).save(review);
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function undiscard(request: Request, response: Response) {
  try {
    const review = await getRepository(Review).findOneOrFail(
      request.params.id,
      { relations: ["metrics", "questions"] }
    );
    const discardedAt = undefined;
    review.discardedAt = discardedAt;
    review.metrics.forEach(metric => (metric.discardedAt = discardedAt));
    review.questions.forEach(question => (question.discardedAt = discardedAt));
    await getRepository(Review).save(review);
    response.sendStatus(204);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}
