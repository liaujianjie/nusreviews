import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import { Metric } from "../entities/Metric";
import { Opinion } from "../entities/Opinion";
import { Question } from "../entities/Question";
import { Review } from "../entities/Review";
import { Tip } from "../entities/Tip";
import { User } from "../entities/User";
import { EntityTokenSignedPayload } from "../types/tokens";
import { getEntityArray } from "../utils/entities";

export async function editOpinion(request: Request, response: Response) {
  try {
    const entityTokenSignedPayload = response.locals
      .payload as EntityTokenSignedPayload<Opinion>;

    const opinion = await getRepository(Opinion).findOneOrFail(
      entityTokenSignedPayload.id
    );
    opinion.description = request.body.description;
    await validateOrReject(opinion);

    await getRepository(Opinion).save(opinion);
    response.status(200).json(opinion);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function editReview(request: Request, response: Response) {
  try {
    const entityTokenSignedPayload = response.locals
      .payload as EntityTokenSignedPayload<Review>;
    const review = await getRepository(Review).findOneOrFail(
      entityTokenSignedPayload.id,
      {
        relations: ["reviewTemplate", "moduleSemester", "metrics", "questions"]
      }
    );

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

    const entityTokenPayload = review.createPayload();
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

export async function deleteReview(request: Request, response: Response) {
  try {
    const entityTokenSignedPayload = response.locals
      .payload as EntityTokenSignedPayload<Review>;

    const review = await getRepository(Review).findOneOrFail(
      entityTokenSignedPayload.id,
      { relations: ["metrics", "questions"] }
    );
    review.discard();

    await getRepository(Review).save(review);
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function editTip(request: Request, response: Response) {
  try {
    const entityTokenSignedPayload = response.locals
      .payload as EntityTokenSignedPayload<Tip>;

    const tip = await getRepository(Tip).findOneOrFail(
      entityTokenSignedPayload.id
    );
    tip.description = request.body.description;
    await validateOrReject(tip);

    await getRepository(Tip).save(tip);
    response.status(200).json(tip);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function verifyEmail(request: Request, response: Response) {
  try {
    const entityTokenSignedPayload = response.locals
      .payload as EntityTokenSignedPayload<User>;
    if (!entityTokenSignedPayload.id) {
      throw new Error("No id provided");
    }

    const user = await getRepository(User).findOneOrFail(
      entityTokenSignedPayload.id
    );
    if (user.email !== entityTokenSignedPayload.email) {
      throw new Error("Email has changed");
    }

    const result = await getRepository(User).update(
      entityTokenSignedPayload.id,
      {
        emailVerified: true
      }
    );
    if (result.affected === 0) {
      throw new Error("Failed to update user");
    }
    response.status(204).send();
  } catch (error) {
    response.sendStatus(400);
    console.error(error);
  }
}
