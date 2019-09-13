import { UsersController } from "../controllers/UsersController";
import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";

export const router = Router();

router.post("/sign_in", UsersController.signIn);
// router.delete("/sign_out", UsersController.signOut);
router.put("/password", [checkJwt], UsersController.resetPassword);

router.get("/", UsersController.all);
router.get("/:id", UsersController.one);
router.post("/", UsersController.save);
router.delete("/", UsersController.remove);

export default router;
