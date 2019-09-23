import { Router } from "express";
import * as MetricsController from "../../controllers/MetricsController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", MetricsController.discard);
router.patch("/:id/undiscard", MetricsController.undiscard);

export default router;
