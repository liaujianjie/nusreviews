import { Router } from "express";
import users from "./users";
import academicYears from "./academicYears";
import semesters from "./semesters";
import modules from "./modules";
import moduleSemesters from "./moduleSemesters";
import opinions from "./opinions";
import opinionVotes from "./opinionVotes";
import tips from "./tips";
import tipVotes from "./tipVotes";
import reviewTemplates from "./reviewTemplates";
import reviews from "./reviews";
import metrics from "./metrics";
import questions from "./questions";
import * as ReviewTemplatesController from "../../controllers/ReviewTemplatesController";
import * as TokensController from "../../controllers/TokensController";
import * as UsersController from "../../controllers/UsersController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { BearerTokenType } from "../../types/tokens";

const routes = Router();

routes.use("/users", users);
routes.use("/academic_years", academicYears);
routes.use("/semesters", semesters);
routes.use("/modules", modules);
routes.use("/module_semesters", moduleSemesters);
routes.use("/opinions", opinions);
routes.use("/opinion_votes", opinionVotes);
routes.use("/tips", tips);
routes.use("/tip_votes", tipVotes);
routes.use("/review_templates", reviewTemplates);
routes.use("/reviews", reviews);
routes.use("/metrics", metrics);
routes.use("/questions", questions);

routes.get(
  "/active_review_template",
  ReviewTemplatesController.activeReviewTemplate
);

routes.post("/login", TokensController.login);
routes.post("/request_reset_password", UsersController.requestResetPassword);
routes.post(
  "/reset_password",
  [checkBearerToken(BearerTokenType.ResetPasswordToken)],
  TokensController.resetPassword
);
routes.post(
  "/refresh_authentication",
  [checkBearerToken(BearerTokenType.RefreshToken)],
  TokensController.refreshAuthentication
);
routes.post(
  "/verify_email",
  [checkBearerToken(BearerTokenType.EntityToken, "User")],
  TokensController.verifyEmail
);
routes.post(
  "/edit_review",
  [checkBearerToken(BearerTokenType.EntityToken, "Review")],
  TokensController.editReview
);
routes.post(
  "/delete_review",
  [checkBearerToken(BearerTokenType.EntityToken, "Review")],
  TokensController.deleteReview
);
routes.post(
  "/edit_opinion",
  [checkBearerToken(BearerTokenType.EntityToken, "Opinion")],
  TokensController.editOpinion
);
routes.post(
  "/delete_opinion",
  [checkBearerToken(BearerTokenType.EntityToken, "Opinion")],
  TokensController.deleteOpinion
);
routes.post(
  "/edit_tip",
  [checkBearerToken(BearerTokenType.EntityToken, "Tip")],
  TokensController.editTip
);
routes.post(
  "/delete_tip",
  [checkBearerToken(BearerTokenType.EntityToken, "Tip")],
  TokensController.deleteTip
);

export default routes;
