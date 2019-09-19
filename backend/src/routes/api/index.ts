import { Router } from "express";
import users from "./users";
import academicYears from "./academicYears";
import semesters from "./semesters";
import modules from "./modules";
import moduleSemesters from "./moduleSemesters";
import opinions from "./opinions";

const routes = Router();

routes.use("/users", users);
routes.use("/academic_years", academicYears);
routes.use("/semesters", semesters);
routes.use("/modules", modules);
routes.use("/module_semesters", moduleSemesters);
routes.use("/opinions", opinions);

export default routes;
