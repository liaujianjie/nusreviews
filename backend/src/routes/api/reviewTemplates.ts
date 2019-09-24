import { Router } from "express";
import * as ReviewTemplatesController from "../../controllers/ReviewTemplatesController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types/users";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.get("/", ReviewTemplatesController.index);
router.get("/:id", ReviewTemplatesController.show);

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.use(checkRole([UserRole.Admin]));
router.post("/", ReviewTemplatesController.create);
router.delete("/:id", ReviewTemplatesController.discard);
router.patch("/:id/undiscard", ReviewTemplatesController.undiscard);

export default router;
