import { Router } from "express";
import * as OpinionsController from "../../controllers/OpinionsController";
import * as OpinionVotesController from "../../controllers/OpinionVotesController";
import { checkEditToken } from "../../middlewares/checkEditToken";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";

export const router = Router();

router.get("/:id", OpinionsController.show);
router.put("/:editToken", [checkEditToken], OpinionsController.update);
router.get("/:id/votes", OpinionsController.votes);

router.use(checkAccessToken);
router.post("/:id/votes", OpinionVotesController.create);
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", OpinionsController.discard);
router.patch("/:id/undiscard", OpinionsController.undiscard);

export default router;
