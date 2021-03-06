import { Router } from "express";
import * as ModuleSemestersController from "../../controllers/ModuleSemestersController";
import * as OpinionsController from "../../controllers/OpinionsController";
import * as ReviewsController from "../../controllers/ReviewsController";
import * as TipsController from "../../controllers/TipsController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkEmailVerified } from "../../middlewares/checkEmailVerified";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.get("/:id", ModuleSemestersController.show);
router.get("/:id/opinions", ModuleSemestersController.opinions);
router.get("/:id/tips", ModuleSemestersController.tips);
router.get("/:id/reviews", ModuleSemestersController.reviews);

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.use(checkEmailVerified);
router.post("/:id/opinions", OpinionsController.create);
router.post("/:id/tips", TipsController.create);
router.post("/:id/reviews", ReviewsController.create);

export default router;
