import { Router } from "express";
import * as OpinionVotesController from "../../controllers/OpinionVotesController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.get("/:id", OpinionVotesController.show);
router.use(checkBearerToken(BearerTokenType.AccessToken));
router.put("/:id", OpinionVotesController.update);
router.delete("/:id", OpinionVotesController.destroy);

export default router;
