import { Column, Entity, ManyToOne, Index, OneToMany } from "typeorm";
import { Module } from "./Module";
import { Semester } from "./Semester";
import { IsOptional, IsNumber, IsString } from "class-validator";
import { Opinion } from "./Opinion";
import { Tip } from "./Tip";
import { Base } from "./Base";
import { Review } from "./Review";

@Entity()
@Index(["module", "semester"], { unique: true })
export class ModuleSemester extends Base {
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

  @OneToMany(type => Review, review => review.moduleSemester)
  reviews!: Review[];

  entityName = "ModuleSemester";
}
