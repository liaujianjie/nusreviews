import { IsString, IsOptional } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany
} from "typeorm";
import { Semester } from "./Semester";
import { Base } from "./Base";

@Entity()
export class AcademicYear extends Base {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  @IsString()
  academicYear!: string;

  @OneToMany(type => Semester, semester => semester.academicYear)
  @IsOptional()
  semesters?: Semester[];
}
