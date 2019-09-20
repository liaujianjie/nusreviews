import { Router } from "express";
import * as TipVotesController from "../../controllers/TipVotesController";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

export const router = Router();

router.get("/:id", TipVotesController.show);
router.use(checkAccessToken);
router.put("/:id", TipVotesController.update);
router.delete("/:id", TipVotesController.destroy);

export default router;
