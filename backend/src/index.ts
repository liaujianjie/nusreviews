import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import ormconfig from "./config/ormconfig";
import routes from "./routes";

createConnection(ormconfig)
  .then(async connection => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));

    app.use("/", routes);

    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));