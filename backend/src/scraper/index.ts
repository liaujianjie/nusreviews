import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { saveModuleInfoList, getModuleInfoList } from "./tasks";
import ormconfig from "../config/ormconfig";
import { ModuleInformation } from "../types/modules";

dotenv.config();

const responsePromise = getModuleInfoList();
createConnection(ormconfig)
  .then(async connection => {
    const response = await responsePromise;
    const moduleInfoList = response.data as ModuleInformation[];
    saveModuleInfoList(connection, moduleInfoList);
  })
  .catch(error => console.error(error));
