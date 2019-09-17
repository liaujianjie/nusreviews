import { IsString } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany
} from "typeorm";
import { Semester } from "./Semester";

@Entity()
export class AcademicYear {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  @IsString()
  academicYear!: string;

  @OneToMany(type => Semester, semester => semester.academicYear)
  semesters?: Semester[];
}
