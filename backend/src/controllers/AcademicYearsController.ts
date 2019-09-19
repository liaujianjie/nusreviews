import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { AcademicYear } from "../entities/AcademicYear";

export const academicYearRepository = () => getRepository(AcademicYear);

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await academicYearRepository().find();
  } catch (error) {
    response.status(400).send();
    return;
  }
  response.status(200).send(result);
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await academicYearRepository().findOneOrFail({
      where: { academicYear: request.params.academic_year }
    });
  } catch (error) {
    response.status(400).send();
    return;
  }
  response.status(200).send(result);
}

export async function semesters(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const academicYear = await academicYearRepository().findOneOrFail({
      where: { academicYear: request.params.academic_year },
      relations: ["semesters"]
    });
    response.status(200).send(academicYear.semesters);
  } catch (error) {
    response.status(400).send();
    return;
  }
}
