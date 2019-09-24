import { Router } from "express";
import * as ReviewsController from "../../controllers/ReviewsController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.get("/:id", ReviewsController.show);

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", ReviewsController.discard);
router.patch("/:id/undiscard", ReviewsController.undiscard);

export default router;
