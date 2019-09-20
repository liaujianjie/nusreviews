import { Router } from "express";
import * as OpinionsController from "../../controllers/OpinionsController";
import * as OpinionVotesController from "../../controllers/OpinionVotesController";
import { checkEditToken } from "../../middlewares/checkEditToken";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

export const router = Router();

router.get("/:id", OpinionsController.show);
router.put("/:editToken", [checkEditToken], OpinionsController.update);

router.use(checkAccessToken);
router.post("/:id/votes", OpinionVotesController.create);

export default router;
