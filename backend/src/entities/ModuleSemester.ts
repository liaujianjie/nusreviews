import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index
} from "typeorm";
import { Discardable } from "./Discardable";
import { Module } from "./Module";
import { Semester } from "./Semester";
import { IsOptional, IsNumber, IsString } from "class-validator";

@Entity()
@Index(["module", "semester"], { unique: true })
export class ModuleSemester extends Discardable {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => Module, module => module.moduleSemesters)
  module!: Module;

  @ManyToOne(type => Semester, semester => semester.moduleSemesters)
  semester!: Semester;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  examDate?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  examDuration?: number;
}
