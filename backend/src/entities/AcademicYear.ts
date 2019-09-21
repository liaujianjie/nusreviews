import { IsString } from "class-validator";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { Semester } from "./Semester";
import { Base } from "./Base";

@Entity()
export class AcademicYear extends Base {
  @Column()
  @Index({ unique: true })
  @IsString()
  academicYear!: string;

  @OneToMany(type => Semester, semester => semester.academicYear)
  semesters!: Semester[];
}
