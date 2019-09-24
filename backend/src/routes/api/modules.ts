import { Router } from "express";
import * as ModulesController from "../../controllers/ModulesController";

export const router = Router();

router.get("/:module_code", ModulesController.show);

export default router;
