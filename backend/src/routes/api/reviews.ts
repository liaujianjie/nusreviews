import { Router } from "express";
import * as ReviewsController from "../../controllers/ReviewsController";
import { checkEditToken } from "../../middlewares/checkEditToken";

export const router = Router();

router.get("/:id", ReviewsController.show);

router.use(checkEditToken);
router.put("/:editToken", ReviewsController.update);
router.delete("/:editToken", ReviewsController.discard);

export default router;
