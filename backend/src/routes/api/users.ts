import { Router } from "express";
import * as UsersController from "../../controllers/UsersController";
import { checkRole } from "../../middlewares/checkRole";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { checkRefreshToken } from "../../middlewares/checkRefreshToken";
import { UserRole } from "../../types/users";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.post("/", UsersController.create);
router.post("/login", UsersController.login);
// router.post("/password", UsersController.requestPasswordReset);
router.get(
  "/refresh_authentication",
  [checkRefreshToken],
  UsersController.refreshAuthentication
);

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.patch("/change_password", UsersController.changePassword);

router.use(checkRole([UserRole.Admin]));
router.get("/", UsersController.index);
router.get("/:id", UsersController.show);
router.delete("/:id", UsersController.discard);
router.patch("/:id/undiscard", UsersController.undiscard);

export default router;
