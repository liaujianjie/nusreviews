import { Router } from "express";
import users from "./users";
import academicYears from "./academicYears";
import semesters from "./semesters";

const routes = Router();

routes.use("/users", users);
routes.use("/academic_years", academicYears);
routes.use("/semesters", semesters);

export default routes;
