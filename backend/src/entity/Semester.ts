import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";

@Entity()
export class Semester extends Discardable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  academicYear: string;

  @Column()
  name: string;
}
