import { Column, Entity, ManyToOne, Index, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { Module } from "./Module";
import { Semester } from "./Semester";
import { IsOptional, IsNumber, IsString } from "class-validator";
import { Opinion } from "./Opinion";
import { Tip } from "./Tip";

@Entity()
@Index(["module", "semester"], { unique: true })
export class ModuleSemester extends Discardable {
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

  @OneToMany(type => Opinion, opinion => opinion.moduleSemester)
  opinions!: Opinion[];

  @OneToMany(type => Tip, tip => tip.moduleSemester)
  tips!: Tip[];
}
