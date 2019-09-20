import { Router } from "express";
import * as TipsController from "../../controllers/TipsController";
import * as TipVotesController from "../../controllers/TipVotesController";
import { checkEditToken } from "../../middlewares/checkEditToken";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

export const router = Router();

router.get("/:id", TipsController.show);
router.put("/:editToken", [checkEditToken], TipsController.update);
router.get("/:id/votes", TipsController.votes);

router.use(checkAccessToken);
router.post("/:id/votes", TipVotesController.create);

export default router;
