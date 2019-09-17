import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { saveModuleInfoList, getModuleInfoList } from "./tasks";
import ormconfig from "../config/ormconfig";
import { Module } from "../entities/Module";
import { ModuleInformation } from "../types/modules";

dotenv.config();

const responsePromise = getModuleInfoList();
createConnection(ormconfig)
  .then(connection => connection.getRepository(Module))
  .then(async repository => {
    const response = await responsePromise;
    const moduleInfoList = response.data as ModuleInformation[];
    saveModuleInfoList(repository, moduleInfoList);
  })
  .catch(error => console.error(error));
