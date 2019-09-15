import { Router } from "express";
import * as UsersController from "../../controllers/UsersController";
import { checkRole } from "../../middlewares/checkRole";
import { checkJwt } from "../../middlewares/checkJwt";
import { UserRole } from "../../types/users";

export const router = Router();

router.post("/", UsersController.create);
router.post("/login", UsersController.login);
// router.post("/password", UsersController.requestPasswordReset);

router.use(checkJwt);
router.patch("/change_password", UsersController.changePassword);
router.patch("/request_jwt", UsersController.requestJwt);
// router.delete("/sign_out", UsersController.signOut);

router.use(checkRole([UserRole.ADMIN]));
router.get("/", UsersController.all);
router.get("/:id", UsersController.one);
router.delete("/", UsersController.remove);

export default router;
