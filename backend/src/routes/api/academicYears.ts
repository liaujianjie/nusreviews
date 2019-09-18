import { Router } from "express";
import * as AcademicYearsController from "../../controllers/AcademicYearsController";

export const router = Router();

router.get("/", AcademicYearsController.index);
router.get("/:academic_year", AcademicYearsController.show);
router.get("/:academic_year/semesters", AcademicYearsController.semesters);

export default router;
