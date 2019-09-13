import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import routes from "./routes";
import * as helmet from "helmet";
import * as cors from "cors";

createConnection()
  .then(async connection => {
    // create express app
    const app = express();

    // call middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(helmet());

    app.use("/", routes);

    // start express server
    app.listen(3000);

    // insert new users for test
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
      })
    );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));
