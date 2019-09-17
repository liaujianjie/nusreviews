import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";
import {
  ModuleCode,
  ModuleTitle,
  Department,
  Faculty,
  Workload,
  NUSModuleAttributes
} from "../types/modules";
import { IsArray, IsOptional, IsNotEmpty, IsString } from "class-validator";

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
  workload?: Workload;

  @Column({
    type: "boolean",
    array: true,
    nullable: true
  })
  @IsOptional()
  @IsArray()
  attributes?: NUSModuleAttributes;

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
