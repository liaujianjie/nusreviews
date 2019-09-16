import Axios from "axios";
import { ModuleInformation } from "../types/modules";

export const getModuleList = async () => {
  try {
    const moduleList = await Axios.get<ModuleInformation[]>(
      "https://api.nusmods.com/v2/2019-2020/moduleInfo.json"
    );

    console.log(moduleList);
  } catch (error) {
    console.error(error);
  }
};
