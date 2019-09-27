import { Router } from "express";
import * as TipsController from "../../controllers/TipsController";
import * as TipVotesController from "../../controllers/TipVotesController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";
import { BearerTokenType } from "../../types/tokens";
import { checkEmailVerified } from "../../middlewares/checkEmailVerified";

export const router = Router();

router.get("/:id", TipsController.show);
router.get("/:id/votes", TipsController.votes);

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.use(checkEmailVerified);
router.post("/:id/votes", TipVotesController.create);
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", TipsController.discard);
router.patch("/:id/undiscard", TipsController.undiscard);

export default router;
