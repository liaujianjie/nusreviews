import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Module } from "../entities/Module";
import { Semester } from "../entities/Semester";
import { MetricTemplate } from "../entities/MetricTemplate";

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const module = await getRepository(Module).findOneOrFail({
      where: { moduleCode: request.params.module_code },
      relations: [
        "moduleSemesters",
        "moduleSemesters.opinions",
        "moduleSemesters.opinions.opinionVotes",
        "moduleSemesters.tips",
        "moduleSemesters.tips.tipVotes",
        "moduleSemesters.reviews",
        "moduleSemesters.reviews.metrics",
        "moduleSemesters.reviews.metrics.metricTemplate",
        "moduleSemesters.reviews.questions",
        "moduleSemesters.reviews.questions.questionTemplate"
      ]
    });

    const metricAggregates: Record<number, number> = {};
    const metricTemplates: Record<number, MetricTemplate> = {};
    module.moduleSemesters.forEach(moduleSemester => {
      moduleSemester.reviews.forEach(review => {
        const filteredQuestions = review.questions.filter(
          question => question.questionTemplate.showInPreview
        );
        review.questions = filteredQuestions;

        review.metrics.forEach(metric => {
          const id = metric.metricTemplate.id;
          metricAggregates[id] = metric.value + (metricAggregates[id] || 0);
          metricTemplates[id] = metric.metricTemplate;
        });
        delete review.metrics;
      });
    });
    const result = { ...module, metricAggregates, metricTemplates };
    response.status(200).json(result);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function moduleSemesters(request: Request, response: Response) {
  try {
    const module = await getRepository(Module).findOneOrFail({
      where: { moduleCode: request.params.module_code },
      relations: ["moduleSemesters"]
    });
    const moduleSemesters = module.moduleSemesters;
    response.status(200).json(moduleSemesters);
  } catch (error) {
    response.sendStatus(400);
  }
}
