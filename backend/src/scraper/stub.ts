import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });
import { createConnection } from "typeorm";
import stub = require("./moduleListStub.json");
import { saveModuleInfoList } from "./tasks";
import { ModuleInformation } from "../types/modules";
import ormconfig from "../../ormconfig";

createConnection(ormconfig)
  .then(connection => {
    const moduleInfoList = stub as ModuleInformation[];
    saveModuleInfoList(connection, moduleInfoList);
  })
  .catch(error => console.error(error));
