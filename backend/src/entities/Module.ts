import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";
import { ModuleCode, ModuleTitle, Department, Faculty } from "../types/modules";
import {
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsBoolean
} from "class-validator";

@Entity()
export class Module extends Discardable {
  @PrimaryGeneratedColumn()
  id!: number;

  // Basic info
  @Column({
    type: "varchar",
    unique: true
  })
  @IsNotEmpty()
  moduleCode!: ModuleCode;

  @Column({
    type: "varchar"
  })
  @IsNotEmpty()
  @IsString()
  title!: ModuleTitle;

  // Additional info
  @Column({
    nullable: true
  })
  @IsOptional()
  @IsString()
  description?: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  moduleCredit!: string;

  @Column({
    type: "varchar"
  })
  @IsNotEmpty()
  @IsString()
  department!: Department;

  @Column({
    type: "varchar"
  })
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
  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  yearLong?: boolean;

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  su?: boolean;

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  grsu?: boolean;

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  ssgf?: boolean; // SkillsFuture Funded

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  sfs?: boolean; // SkillsFuture series

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  lab?: boolean; // Lab based

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  ism?: boolean; // Independent study

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  urop?: boolean; // Undergraduate Research Opportunities Program

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  fyp?: boolean; // Final Year Project

  // Requisites
  @Column({
    nullable: true
  })
  @IsOptional()
  @IsString()
  prerequisite?: string;

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsString()
  corequisite?: string;

  @Column({
    nullable: true
  })
  @IsOptional()
  @IsString()
  preclusion?: string;

  // Semester data is stored in semester and module_semester
  // Requisite tree is left out
}
