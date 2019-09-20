import { Router } from "express";
import * as OpinionVotesController from "../../controllers/OpinionVotesController";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

export const router = Router();

router.get("/:id", OpinionVotesController.show);
router.use(checkAccessToken);
router.put("/:id", OpinionVotesController.update);
router.delete("/:id", OpinionVotesController.destroy);

export default router;
