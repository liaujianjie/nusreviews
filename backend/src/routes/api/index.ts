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
import * as UsersController from "../../controllers/UsersController";
import * as ReviewsController from "../../controllers/ReviewsController";
import * as OpinionsController from "../../controllers/OpinionsController";
import * as TipsController from "../../controllers/TipsController";
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
routes.post("/verify_email", UsersController.verifyEmail);
routes.post("/edit_review", ReviewsController.update);
routes.post("/delete_review", ReviewsController.discard);
routes.post("/edit_opinion", OpinionsController.update);
routes.post("/edit_tip", TipsController.update);

export default routes;
