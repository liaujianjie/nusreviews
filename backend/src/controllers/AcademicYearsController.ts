import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { AcademicYear } from "../entities/AcademicYear";

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const academicYear = await getRepository(AcademicYear).find();
    response.status(200).json(academicYear);
  } catch (error) {
    response.status(400).send();
  }
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const academicYear = await getRepository(AcademicYear).findOneOrFail({
      where: { academicYear: request.params.academic_year }
    });
    response.status(200).json(academicYear);
  } catch (error) {
    next(error);
  }
}

export async function semesters(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const academicYear = await getRepository(AcademicYear).findOneOrFail({
    where: { academicYear: request.params.academic_year },
    relations: ["semesters"]
  });
  response.status(200).json(academicYear.semesters);
}
