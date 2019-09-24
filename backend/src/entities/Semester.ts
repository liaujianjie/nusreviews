import { Column, Entity, ManyToOne, Index, OneToMany } from "typeorm";
import { AcademicYear } from "./AcademicYear";
import { Base } from "./Base";
import { ModuleSemester } from "./ModuleSemester";

@Entity()
@Index(["semester", "academicYear"], { unique: true })
export class Semester extends Base {
  @Column()
  semester!: number;

  @ManyToOne(type => AcademicYear, academicYear => academicYear.semesters)
  academicYear!: AcademicYear;

  @OneToMany(type => ModuleSemester, moduleSemester => moduleSemester.semester)
  moduleSemesters!: ModuleSemester[];

  entityName = "Semester";
}
