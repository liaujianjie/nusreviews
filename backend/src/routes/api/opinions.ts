import { Router } from "express";
import * as OpinionsController from "../../controllers/OpinionsController";
import { checkEditToken } from "../../middlewares/checkEditToken";

export const router = Router();

router.get("/:id", OpinionsController.show);

router.use(checkEditToken);
router.patch("/:id", OpinionsController.update);

export default router;
