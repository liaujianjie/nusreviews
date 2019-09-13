import { UsersController } from "../controllers/UsersController";
import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

export const router = Router();

/**
 * Sign in
 *
 * @returns jsonwebtoken
 */
router.post("/sign_in", UsersController.signIn);

// router.delete("/sign_out", UsersController.signOut);

// Reset password
router.put("/password", [checkJwt], UsersController.resetPassword);

// Request password reset
// router.post("/password", UsersController.requestPasswordReset);

// Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], UsersController.all);

// Get a user
router.get("/:id", [checkJwt, checkRole(["ADMIN"])], UsersController.one);

// Create a new user
router.post("/", UsersController.save);

// Soft-delete a user
router.delete("/", [checkJwt, checkRole(["ADMIN"])], UsersController.remove);

export default router;
