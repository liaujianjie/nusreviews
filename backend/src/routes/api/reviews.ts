import { Router } from "express";
import * as ReviewsController from "../../controllers/ReviewsController";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";

export const router = Router();

router.get("/:id", ReviewsController.show);

router.use(checkAccessToken);
router.use(checkRole([UserRole.Admin]));
router.delete("/:id", ReviewsController.discard);
router.patch("/:id", ReviewsController.undiscard);

export default router;
