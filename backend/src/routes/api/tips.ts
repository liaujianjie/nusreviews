import { Router } from "express";
import * as TipsController from "../../controllers/TipsController";
import { checkEditToken } from "../../middlewares/checkEditToken";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

export const router = Router();

router.get("/:id", TipsController.show);
router.put("/:editToken", [checkEditToken], TipsController.update);

router.use(checkAccessToken);
// router.post("/:id/votes", VotesController.createTipVote);

export default router;
