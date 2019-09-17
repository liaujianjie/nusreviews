import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index
} from "typeorm";
import { AcademicYear } from "./AcademicYear";
import { Base } from "./Base";

@Entity()
@Index(["semester", "academicYear"], { unique: true })
export class Semester extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  semester!: number;

  @ManyToOne(type => AcademicYear, academicYear => academicYear.semesters)
  academicYear!: AcademicYear;
}
