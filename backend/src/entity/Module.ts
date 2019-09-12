import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";

@Entity()
export class Module extends Discardable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  code: string;

  @Column()
  title: string;

  @Column()
  faculty: string;

  @Column()
  department: string;

  @Column()
  description: string;

  @Column()
  credit: number;

  @Column()
  workload: string;

  @Column()
  prerequisite: string;

  @Column()
  preclusion: string;

  @Column()
  corequisite: string;
}
