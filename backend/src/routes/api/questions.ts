import { Router } from "express";
import * as QuestionsController from "../../controllers/QuestionsController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", QuestionsController.discard);
router.patch("/:id/undiscard", QuestionsController.undiscard);

export default router;
