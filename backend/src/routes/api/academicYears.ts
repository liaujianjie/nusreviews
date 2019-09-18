import { Router } from "express";
import * as AcademicYearsController from "../../controllers/AcademicYearsController";

export const router = Router();

router.get("/", AcademicYearsController.index);
router.get("/:id", AcademicYearsController.show);
router.get("/:id/semesters", AcademicYearsController.semesters);

export default router;
