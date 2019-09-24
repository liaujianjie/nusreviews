import { Router } from "express";
import * as TipVotesController from "../../controllers/TipVotesController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.get("/:id", TipVotesController.show);
router.use(checkBearerToken(BearerTokenType.AccessToken));
router.put("/:id", TipVotesController.update);
router.delete("/:id", TipVotesController.destroy);

export default router;
