import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { saveModuleInfoList } from "./tasks";
import ormconfig from "../config/ormconfig";
import { ModuleInformation } from "../types/modules";
import stub = require("./moduleListStub.json");

dotenv.config();

createConnection(ormconfig)
  .then(connection => {
    const moduleInfoList = stub as ModuleInformation[];
    saveModuleInfoList(connection, moduleInfoList);
  })
  .catch(error => console.error(error));
