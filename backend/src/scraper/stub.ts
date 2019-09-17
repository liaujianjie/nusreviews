import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { saveModuleInfoList } from "./tasks";
import ormconfig from "../config/ormconfig";
import { Module } from "../entities/Module";
import { ModuleInformation } from "../types/modules";
import stub = require("./moduleListStub.json");

dotenv.config();

createConnection(ormconfig)
  .then(connection => connection.getRepository(Module))
  .then(repository => {
    const moduleInfoList = stub as ModuleInformation[];
    saveModuleInfoList(repository, moduleInfoList);
  })
  .catch(error => console.error(error));
