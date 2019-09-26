import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Module } from "../entities/Module";
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
        "moduleSemesters.semester",
        "moduleSemesters.semester.academicYear",
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

    const metricSums: Record<number, number> = {};
    const metricCounts: Record<number, number> = {};
    const metricTemplates: Record<number, MetricTemplate> = {};
    module.moduleSemesters.forEach(moduleSemester => {
      moduleSemester.reviews.forEach(review => {
        const filteredQuestions = review.questions.filter(
          question => question.questionTemplate.showInPreview
        );
        review.questions = filteredQuestions;

        review.metrics.forEach(metric => {
          const id = metric.metricTemplate.id;
          metricSums[id] = metric.value + (metricSums[id] || 0);
          metricCounts[id] = 1 + (metricCounts[id] || 0);
          metricTemplates[id] = metric.metricTemplate;
        });
        delete review.metrics;
      });
    });

    const metricAverages: Record<number, number> = {};
    Object.values(metricTemplates).forEach(metricTemplate => {
      const id = metricTemplate.id;
      metricAverages[id] = metricSums[id] / metricCounts[id];
    });
    const result = { ...module, metricAverages, metricTemplates };
    response.status(200).json(result);
  } catch (error) {
    response.sendStatus(400);
  }
}
