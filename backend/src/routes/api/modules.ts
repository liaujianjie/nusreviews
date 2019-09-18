import { Router } from "express";
import * as ModulesController from "../../controllers/ModulesController";

export const router = Router();

router.get("/", ModulesController.index);
router.get("/:module_code", ModulesController.show);
router.get("/:module_code/semesters", ModulesController.semesters);

export default router;
