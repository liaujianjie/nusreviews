import { Router } from "express";
import * as MetricsController from "../../controllers/MetricsController";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";

export const router = Router();

router.use(checkAccessToken);
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", MetricsController.discard);
router.patch("/:id/undiscard", MetricsController.undiscard);

export default router;
