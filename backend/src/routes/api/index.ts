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
import * as UsersController from "../../controllers/UsersController";
import * as ReviewsController from "../../controllers/ReviewsController";
import { checkEditToken } from "../../middlewares/checkEditToken";

const routes = Router();

routes.get(
  "/email_verification/:emailVerificationToken",
  UsersController.verifyEmail
);
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

routes.use(checkEditToken);
routes.post("/edit_review/:editToken", ReviewsController.update);
routes.post("/discard_review/:editToken", ReviewsController.discard);

export default routes;
