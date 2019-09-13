import { UsersController } from "../controller/UsersController";
import { Router } from "express";
import { checkJwt } from "../middleware/checkJwt";

export const router = Router();

router.post("/sign_in", UsersController.signIn);
// router.delete("/sign_out", UsersController.signOut);
router.put("/password", [checkJwt], UsersController.resetPassword);

router.get("/users", UsersController.all);
router.get("/users/:id", UsersController.one);
router.post("/users", UsersController.save);
router.delete("/users", UsersController.remove);

export default router;
