import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index
} from "typeorm";
import { AcademicYear } from "./AcademicYear";
import { Discardable } from "./Discardable";

@Entity()
@Index(["semester", "academicYear"], { unique: true })
export class Semester extends Discardable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  semester!: number;

  @ManyToOne(type => AcademicYear, academicYear => academicYear.semesters)
  academicYear!: AcademicYear;
}
