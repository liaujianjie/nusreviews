import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });
import { createConnection } from "typeorm";
import { saveModuleInfoList, getModuleInfoList } from "./tasks";
import { ModuleInformation } from "../types/modules";
import ormconfig from "../../ormconfig";

const responsePromise = getModuleInfoList();
createConnection(ormconfig)
  .then(async connection => {
    const response = await responsePromise;
    const moduleInfoList = response.data as ModuleInformation[];
    saveModuleInfoList(connection, moduleInfoList);
  })
  .catch(error => console.error(error));
