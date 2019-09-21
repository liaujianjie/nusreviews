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
import * as UsersController from "../../controllers/UsersController";

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

export default routes;
