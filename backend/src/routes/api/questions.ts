import { Router } from "express";
import * as QuestionsController from "../../controllers/QuestionsController";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";

export const router = Router();

router.use(checkAccessToken);
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", QuestionsController.discard);
router.patch("/:id/undiscard", QuestionsController.undiscard);

export default router;
