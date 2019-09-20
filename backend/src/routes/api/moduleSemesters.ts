import { Router } from "express";
import * as ModuleSemestersController from "../../controllers/ModuleSemestersController";
import * as OpinionsController from "../../controllers/OpinionsController";
import * as TipsController from "../../controllers/TipsController";
import { checkAccessToken } from "../../middlewares/checkAccessToken";

export const router = Router();

router.get("/:id", ModuleSemestersController.show);
router.get("/:id/opinions", ModuleSemestersController.opinions);
router.get("/:id/tips", ModuleSemestersController.tips);
// router.get("/:id/reviews", ModuleSemestersController.reviews);

router.use(checkAccessToken);
router.post("/:id/opinions", OpinionsController.create);
router.post("/:id/tips", TipsController.create);
// router.post("/:id/reviews", ModulesController.create);

export default router;
