import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  OneToMany,
  ManyToMany
} from "typeorm";
import { AcademicYear } from "./AcademicYear";
import { Base } from "./Base";
import { IsOptional } from "class-validator";
import { ModuleSemester } from "./ModuleSemester";
import { Module } from "./Module";

@Entity()
@Index(["semester", "academicYear"], { unique: true })
export class Semester extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  semester!: number;

  @ManyToOne(type => AcademicYear, academicYear => academicYear.semesters)
  academicYear!: AcademicYear;

  @OneToMany(type => ModuleSemester, moduleSemester => moduleSemester.module)
  @IsOptional()
  moduleSemesters?: ModuleSemester[];

  @ManyToMany(type => Module, module => module.semesters)
  @IsOptional()
  modules?: Module[];
}
