import { Router } from "express";
import * as OpinionsController from "../../controllers/OpinionsController";
import * as OpinionVotesController from "../../controllers/OpinionVotesController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";
import { BearerTokenType } from "../../types/tokens";
import { checkEmailVerified } from "../../middlewares/checkEmailVerified";

export const router = Router();

router.get("/:id", OpinionsController.show);
router.get("/:id/votes", OpinionsController.votes);

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.use(checkEmailVerified);
router.post("/:id/votes", OpinionVotesController.create);
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", OpinionsController.discard);
router.patch("/:id/undiscard", OpinionsController.undiscard);

export default router;
