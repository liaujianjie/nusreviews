import Axios from "axios";
import { validateSync } from "class-validator";
import { Connection } from "typeorm";
import { Module } from "../entities/Module";
import { ModuleInformation } from "../types/modules";
import { Semester } from "../entities/Semester";
import { AcademicYear } from "../entities/AcademicYear";
import { ModuleSemester } from "../entities/ModuleSemester";

export const ACADEMIC_YEAR = "2019-2020";

export async function getModuleInfoList() {
  return Axios.get<ModuleInformation[]>(
    `https://api.nusmods.com/v2/${ACADEMIC_YEAR}/moduleInfo.json`
  );
}

let semesterList: Semester[];

// TODO: Log errors into file
export async function saveModuleInfoList(
  connection: Connection,
  moduleInfoList: ModuleInformation[]
) {
  const academicYearRepository = connection.getRepository(AcademicYear);
  const academicYear = getAcademicYear();
  academicYearRepository.save(academicYear);

  const semesterRepository = connection.getRepository(Semester);
  semesterList = getSemesterList(academicYear);
  semesterRepository.save(semesterList);

  const moduleRepository = connection.getRepository(Module);
  const moduleSemesterRepository = connection.getRepository(ModuleSemester);
  const moduleList = getModuleList(moduleInfoList);
  moduleList.forEach(result => {
    moduleRepository.save(result.module);
    moduleSemesterRepository.save(result.moduleSemesterList);
  });
}

function getAcademicYear(): AcademicYear {
  const academicYear = new AcademicYear();
  academicYear.academicYear = ACADEMIC_YEAR;
  return academicYear;
}

function getSemesterList(academicYear: AcademicYear): Semester[] {
  const semesters: Semester[] = [];
  for (let i = 1; i <= 4; i++) {
    const semester = new Semester();
    semester.academicYear = academicYear;
    semester.semester = i;
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

function getModuleList(
  moduleInfoList: ModuleInformation[]
): Array<{ module: Module; moduleSemesterList: ModuleSemester[] }> {
  const moduleList: Array<{
    module: Module;
    moduleSemesterList: ModuleSemester[];
  }> = [];
  moduleInfoList.forEach(moduleInfo => {
    const module = getModule(moduleInfo);
    if (module) {
      const moduleSemesterList = getModuleSemesterList(moduleInfo, module);
      moduleList.push({ module, moduleSemesterList });
    }
  });
  return moduleList;
}

function getModuleSemesterList(
  moduleInfo: ModuleInformation,
  module: Module
): ModuleSemester[] {
  const moduleSemesterList: ModuleSemester[] = [];
  moduleInfo.semesterData.forEach(semesterData => {
    const semester = semesterList.find(
      semester => semester.semester === semesterData.semester
    );
    const moduleSemester = new ModuleSemester();
    moduleSemester.module = module;
    moduleSemester.semester = semester!;
    moduleSemester.examDate = semesterData.examDate;
    moduleSemester.examDuration = semesterData.examDuration;
    moduleSemesterList.push(moduleSemester);
  });
  return moduleSemesterList;
}
