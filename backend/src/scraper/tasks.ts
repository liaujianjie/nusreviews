import Axios from "axios";
import { validateSync } from "class-validator";
import { Repository } from "typeorm";
import { Module } from "../entities/Module";
import { ModuleInformation } from "../types/modules";

export async function getModuleInfoList() {
  return Axios.get<ModuleInformation[]>(
    "https://api.nusmods.com/v2/2019-2020/moduleInfo.json"
  );
}

/**
 * CAUTION: THIS UTIL IS MEANT TO ONLY BE USED ONCE TO POPULATE THE DATABASE!
 * IT ISSUES 11,474 API CALLS
 */
export async function saveModuleInfoList(
  repository: Repository<Module>,
  moduleInfoList: ModuleInformation[]
) {
  const moduleList: Module[] = [];
  moduleInfoList.forEach(moduleInfo => {
    const module = new Module();
    const read = { ...moduleInfo };
    const attributes = { ...read.attributes };

    Object.entries(attributes);

    delete read.semesterData;
    Object.assign(module, read);
    const errors = validateSync(module);
    if (errors.length > 0) {
      console.error(errors);
      return;
    }
    moduleList.push(module);
  });

  console.log("saving " + moduleList.length + " modules");
  moduleList.forEach(module => {
    repository.save(module).catch(error => {
      console.error(error);
    });
  });
}
