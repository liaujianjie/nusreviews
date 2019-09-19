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

@Entity()
export class Module extends Discardable {
  @PrimaryGeneratedColumn()
  id!: number;

  // Basic info
  @Column({
    type: "varchar",
    unique: true
  })
  moduleCode!: ModuleCode;

  @Column({
    type: "varchar"
  })
  title!: ModuleTitle;

  // Additional info
  @Column({
    nullable: true
  })
  description?: string;

  @Column()
  moduleCredit!: string;

  @Column({
    type: "varchar"
  })
  department!: Department;

  @Column({
    type: "varchar"
  })
  faculty!: Faculty;

  @Column({
    type: "int",
    array: true,
    nullable: true
  })
  workload?: Workload;

  @Column({
    type: "boolean",
    array: true,
    nullable: true
  })
  attributes?: NUSModuleAttributes;

  // Requisites
  @Column({
    nullable: true
  })
  prerequisite?: string;

  @Column({
    nullable: true
  })
  corequisite?: string;

  @Column({
    nullable: true
  })
  preclusion?: string;

  // Semester data is stored in semester and module_semester
  // Requisite tree is left out
}
