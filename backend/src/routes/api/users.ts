import * as UsersController from "../../controllers/UsersController";
import { Router } from "express";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";
import { UserRole } from "../../types";

export const router = Router();

/**
 * Sign in
 *
 * @return jsonwebtoken
 */
router.post("/login", UsersController.login);

router.patch("/request_jwt", [checkJwt], UsersController.requestJwt);

// router.delete("/sign_out", UsersController.signOut);

// Reset password
router.put("/password", [checkJwt], UsersController.resetPassword);

// Request password reset
// router.post("/password", UsersController.requestPasswordReset);

/**
 * Get all users
 *
 * @return User[]
 */
router.get("/", [checkJwt, checkRole([UserRole.ADMIN])], UsersController.all);

/**
 * Get a user
 *
 * @return User
 */
router.get(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UsersController.one
);

// Create a new user
router.post("/", UsersController.save);

// Soft-delete a user
router.delete(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UsersController.remove
);

export default router;
