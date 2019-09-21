import { Router } from "express";
import * as UsersController from "../../controllers/UsersController";
import { checkRole } from "../../middlewares/checkRole";
import { checkAccessToken } from "../../middlewares/checkAccessToken";
import { checkRefreshToken } from "../../middlewares/checkRefreshToken";
import { UserRole } from "../../types/users";

export const router = Router();

router.post("/", UsersController.create);
router.post("/login", UsersController.login);
// router.post("/password", UsersController.requestPasswordReset);
router.get(
  "/refresh_authentication",
  [checkRefreshToken],
  UsersController.refreshAuthentication
);

router.use(checkAccessToken);
router.patch("/change_password", UsersController.changePassword);

router.use(checkRole([UserRole.Admin]));
router.get("/", UsersController.index);
router.get("/:id", UsersController.show);
router.delete("/:id", UsersController.discard);
router.patch("/:id/undiscard", UsersController.undiscard);

export default router;
