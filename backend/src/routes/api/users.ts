import { Router } from "express";
import * as UsersController from "../../controllers/UsersController";
import { checkRole } from "../../middlewares/checkRole";
import { checkJwt } from "../../middlewares/checkJwt";
import { UserRole } from "../../types/users";

export const router = Router();

router.post("/", UsersController.create);
router.post("/login", UsersController.login);

router.patch("/request_jwt", [checkJwt], UsersController.requestJwt);
// router.delete("/sign_out", UsersController.signOut);

router.put("/password", [checkJwt], UsersController.changePassword);
// router.post("/password", UsersController.requestPasswordReset);
router.get("/", [checkJwt, checkRole([UserRole.ADMIN])], UsersController.all);
router.get(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UsersController.one
);
router.delete(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UsersController.remove
);

export default router;
