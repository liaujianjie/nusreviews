import { Router } from "express";
import * as ModulesController from "../../controllers/ModulesController";

export const router = Router();

router.get("/:module_code", ModulesController.show);
router.get("/:module_code/module_semesters", ModulesController.moduleSemesters);

export default router;
