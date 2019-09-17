import Axios from "axios";
import { validateSync } from "class-validator";
import { Connection } from "typeorm";
import { Module } from "../entities/Module";
import { ModuleInformation } from "../types/modules";
import { Semester } from "../entities/Semester";
import { AcademicYear } from "../entities/AcademicYear";

export const ACADEMIC_YEAR = "2019-2020";

export async function getModuleInfoList() {
  return Axios.get<ModuleInformation[]>(
    `https://api.nusmods.com/v2/${ACADEMIC_YEAR}/moduleInfo.json`
  );
}

// TODO: Log errors into file
export async function saveModuleInfoList(
  connection: Connection,
  moduleInfoList: ModuleInformation[]
) {
  const academicYearRepository = connection.getRepository(AcademicYear);
  const academicYear = getAcademicYear();
  academicYearRepository.save(academicYear);

  const semesterRepository = connection.getRepository(Semester);
  const semesters = getSemesters(academicYear);
  semesterRepository.save(semesters);

  const moduleRepository = connection.getRepository(Module);
  const moduleList = getModuleList(moduleInfoList);
  moduleList.forEach(module => moduleRepository.save(module));
}

function getAcademicYear(): AcademicYear {
  const academicYear = new AcademicYear();
  academicYear.academicYear = ACADEMIC_YEAR;
  return academicYear;
}

function getSemesters(academicYear: AcademicYear): Semester[] {
  const semesters: Semester[] = [];
  for (let i = 1; i <= 4; i++) {
    const semester = new Semester();
    semester.semester = i;
    semester.academicYear = academicYear;
    semesters.push(semester);
  }
  return semesters;
}

function getModule(moduleInfo: ModuleInformation): Module | null {
  const module = new Module();
  const read = { ...moduleInfo };

  delete read.semesterData;
  const attributes = read.attributes;
  if (attributes) {
    module.yearLong = attributes.year;
    module.su = attributes.su;
    module.graduateSu = attributes.grsu;
    module.skillsFutureSingaporeFunded = attributes.ssgf;
    module.skillsFutureSeries = attributes.sfs;
    module.labBased = attributes.lab;
    module.independentStudy = attributes.ism;
    module.undergraduateResearchOpportunities = attributes.urop;
    module.finalYearProject = attributes.fyp;
    delete read.attributes;
  }

  Object.assign(module, read);
  const errors = validateSync(module);
  if (errors.length > 0) {
    // console.error(errors);
    return null;
  }
  return module;
}

function getModuleList(moduleInfoList: ModuleInformation[]): Module[] {
  const moduleList: Module[] = [];
  moduleInfoList.forEach(moduleInfo => {
    const module = getModule(moduleInfo);
    if (module) {
      moduleList.push(module);
    }
  });
  return moduleList;
}
