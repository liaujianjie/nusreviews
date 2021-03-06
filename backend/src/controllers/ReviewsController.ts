import { validateOrReject } from "class-validator";
import { Response, Request } from "express";
import { getRepository, IsNull } from "typeorm";
import { sign } from "jsonwebtoken";
import { Metric } from "../entities/Metric";
import { ModuleSemester } from "../entities/ModuleSemester";
import { ReviewTemplate } from "../entities/ReviewTemplate";
import { Question } from "../entities/Question";
import { Review } from "../entities/Review";
import { getEntityArray } from "../utils/entities";
import { AccessTokenSignedPayload } from "../types/tokens";
import { sendEntityEmail } from "../utils/sendgrid";

export async function create(request: Request, response: Response) {
  try {
    const accessTokenSignedPayload = response.locals
      .payload as AccessTokenSignedPayload;

    const reviewTemplate = await getRepository(ReviewTemplate).findOneOrFail({
      discardedAt: IsNull()
    });
    const moduleSemester = await getRepository(ModuleSemester).findOneOrFail(
      request.params.id,
      { relations: ["module"] }
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

    const entityTokenPayload = review.createPayload();
    const entityToken = sign(entityTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "120 days"
    });
    const result = {
      review: review.stringify(),
      entityToken
    };
    sendEntityEmail(accessTokenSignedPayload, moduleSemester, review, entityToken);
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
          "moduleSemester",
          "moduleSemester.module",
          "moduleSemester.semester",
          "moduleSemester.semester.academicYear",
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

export async function discard(request: Request, response: Response) {
  try {
    const review = await getRepository(Review).findOneOrFail(
      request.params.id,
      { relations: ["metrics", "questions"] }
    );
    review.setDiscardedAt(new Date());

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
    review.setDiscardedAt(undefined);

    await getRepository(Review).save(review);
    response.sendStatus(204);
  } catch (error) {
    console.error(error);
    response.sendStatus(400);
  }
}
