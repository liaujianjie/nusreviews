import { Router } from "express";
import * as ReviewTemplatesController from "../../controllers/ReviewTemplatesController";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";

export const router = Router();

router.get("/", ReviewTemplatesController.index);
router.get("/:id", ReviewTemplatesController.show);

router.use(checkAccessToken);
router.use(checkRole([UserRole.Admin]));
router.post("/", ReviewTemplatesController.create);
router.delete("/:id/discard", ReviewTemplatesController.discard);
router.patch("/:id/undiscard", ReviewTemplatesController.undiscard);

export default router;
