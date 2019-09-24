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
import * as TokensController from "../../controllers/TokensController";
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

routes.use(checkBearerToken(BearerTokenType.EntityToken));
routes.post("/verify_email", TokensController.verifyEmail);
routes.post("/edit_review", TokensController.editReview);
routes.post("/delete_review", TokensController.deleteReview);
routes.post("/edit_opinion", TokensController.editOpinion);
routes.post("/delete_opinion", TokensController.deleteOpinion);
routes.post("/edit_tip", TokensController.editTip);
routes.post("/delete_tip", TokensController.deleteTip);

export default routes;
