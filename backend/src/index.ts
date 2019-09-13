import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import routes from "./routes";
import * as helmet from "helmet";
import * as cors from "cors";
import { hashSync } from "bcryptjs";

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
        username: "shawnkoh",
        password: hashSync("setMeUp?"),
        email: "shawn@nusreviews.com",
        role: "ADMIN"
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        username: "jianjie",
        password: hashSync("setMeUp?"),
        email: "jianjie@nusreviews.com",
        role: "ADMIN"
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        username: "eloise",
        password: hashSync("setMeUp?"),
        email: "eloise@nusreviews.com",
        role: "ADMIN"
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        username: "branson",
        password: hashSync("setMeUp?"),
        email: "branson@nusreviews.com",
        role: "ADMIN"
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        username: "anh",
        password: hashSync("setMeUp?"),
        email: "anh@nusreviews.com",
        role: "ADMIN"
      })
    );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));
