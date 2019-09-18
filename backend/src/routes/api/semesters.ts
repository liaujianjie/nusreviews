import { Router } from "express";
import * as SemestersController from "../../controllers/SemestersController";

export const router = Router();

router.get("/", SemestersController.index);
router.get("/:id", SemestersController.show);
router.get("/:id/modules", SemestersController.modules);

export default router;
