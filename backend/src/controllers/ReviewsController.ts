import { validateOrReject } from "class-validator";
import { Response, Request } from "express";
import { getRepository, IsNull } from "typeorm";
import { Metric } from "../entities/Metric";
import { ModuleSemester } from "../entities/ModuleSemester";
import { ReviewTemplate } from "../entities/ReviewTemplate";
import { Question } from "../entities/Question";
import { Review } from "../entities/Review";
import { getEntityArray } from "../utils/entities";
import {
  EntityTokenSignedPayload,
  EntityTokenPayload,
  BearerTokenType
} from "../types/tokens";
import { sign } from "jsonwebtoken";

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
    review.metrics = await getEntityArray(request.body.metrics, Metric, {
      review: review
    });
    review.questions = await getEntityArray(request.body.questions, Question, {
      review: review
    });
    await validateOrReject(review);

    await getRepository(Review).save(review);
    const payload: EntityTokenPayload<Review> = {
      type: BearerTokenType.EntityToken,
      id: review.id
    };
    const entityToken = sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "120 days"
    });
    const result = {
      review: review.stringify(),
      entityToken
    };
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
      {
        relations: [
          "metrics",
          "metrics.metricTemplate",
          "questions",
          "questions.questionTemplate"
        ]
      }
    );
    response.status(200).json(review.stringify());
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

export async function update(request: Request, response: Response) {
  try {
    const payload = response.locals.payload as EntityTokenSignedPayload<Review>;
    const review = await getRepository(Review).findOneOrFail(payload.id, {
      relations: ["reviewTemplate", "moduleSemester", "metrics", "questions"]
    });

    const newMetrics = await getEntityArray(request.body.metrics, Metric, {
      review: review
    });

    const newQuestions = await getEntityArray(
      request.body.questions,
      Question,
      {
        review: review
      }
    );

    review.expectedGrade = request.body.expectedGrade;
    review.actualGrade = request.body.actualGrade;
    review.metrics.forEach(metric => {
      const newMetric = newMetrics.find(
        newMetric => metric.metricTemplate === newMetric.metricTemplate
      );
      Object.assign(metric, newMetric);
    });

    review.questions.forEach(question => {
      const newQuestion = newQuestions.find(
        newQuestion =>
          question.questionTemplate === newQuestion.questionTemplate
      );
      Object.assign(question, newQuestion);
    });
    await validateOrReject(review);
    await getRepository(Review).save(review);

    const entityTokenPayload: EntityTokenPayload<Review> = {
      type: BearerTokenType.EntityToken,
      id: review.id
    };

    const entityToken = sign(entityTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "120 days"
    });

    const result = {
      review: review.stringify(),
      entityToken
    };
    response.status(200).json(result);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}

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
