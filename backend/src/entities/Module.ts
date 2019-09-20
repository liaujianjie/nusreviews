import { Column, Entity, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { ModuleCode, ModuleTitle, Department, Faculty } from "../types/modules";
import {
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsBoolean
} from "class-validator";
import { ModuleSemester } from "./ModuleSemester";
import { Base } from "./Base";

@Entity()
export class Module extends Base {
  // Basic info
  @Column({
    type: "varchar",
    unique: true
  })
  @IsNotEmpty()
  moduleCode!: ModuleCode;

  @Column({ type: "varchar" })
  @IsNotEmpty()
  @IsString()
  title!: ModuleTitle;

  // Additional info
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  moduleCredit!: string;

  @Column({ type: "varchar" })
  @IsNotEmpty()
  @IsString()
  department!: Department;

  @Column({ type: "varchar" })
  @IsNotEmpty()
  @IsString()
  faculty!: Faculty;

  @Column({
    type: "real",
    array: true,
    nullable: true
  })
  @IsOptional()
  @IsArray()
  workload?: number[]; // Opted not to use NUSMODS Workload type

  // Attributes
  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  yearLong?: boolean; // year

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  su?: boolean; // su

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  graduateSu?: boolean; // grsu

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  skillsFutureSingaporeFunded?: boolean; // ssgf

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  skillsFutureSeries?: boolean; // sfs

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  labBased?: boolean; // lab

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  independentStudy?: boolean; // ism

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  undergraduateResearchOpportunities?: boolean; // urop

  @Column({ nullable: true })
  @IsOptional()
  @IsBoolean()
  finalYearProject?: boolean; // fyp

  // Requisites
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  prerequisite?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  corequisite?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  preclusion?: string;

  // Semester data is stored in semester and module_semester
  // Requisite tree is left out

  @OneToMany(type => ModuleSemester, moduleSemester => moduleSemester.module)
  moduleSemesters!: ModuleSemester[];
}
