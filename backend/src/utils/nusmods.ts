import Axios from "axios";
import { ModuleInformation } from "../types/modules";
import { getRepository } from "typeorm";
import { Module } from "../entities/Module";
import * as stub from "./moduleListStub.json";
import { validateSync } from "class-validator";

export function getModuleInfoList() {
  return Axios.get<ModuleInformation[]>(
    "https://api.nusmods.com/v2/2019-2020/moduleInfo.json"
  );
}

export function getModuleInfoListStub(): ModuleInformation[] {
  return stub as ModuleInformation[];
}

/**
 * CAUTION: THIS UTIL IS MEANT TO ONLY BE USED ONCE TO POPULATE THE DATABASE!
 * IT ISSUES 11,474 API CALLS
 */
export async function saveModuleInfoList(moduleInfoList: ModuleInformation[]) {
  const moduleList: Module[] = [];
  moduleInfoList.forEach(moduleInfo => {
    const module = new Module();
    const read = { ...moduleInfo };
    if (typeof moduleInfo.workload === "string") {
      return;
    }

    delete read.semesterData;
    delete read.attributes;
    Object.assign(module, read);
    const errors = validateSync(module);
    if (errors.length > 0) {
      console.error(errors);
    }
    moduleList.push(module);
  });

  console.log("saving " + moduleList.length + " modules");
  moduleList.forEach(module => {
    getRepository(Module)
      .save(module)
      .catch(error => {
        console.error(error);
      });
  });
}
