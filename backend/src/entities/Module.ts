import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";

// TODO: Check if every module has all the properties
@Entity()
export class Module extends Discardable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true
  })
  code!: string;

  @Column()
  title?: string;

  @Column()
  faculty?: string;

  @Column()
  department?: string;

  @Column()
  description?: string;

  @Column()
  credit?: number;

  @Column()
  preclusion?: string;

  @Column()
  prerequisite?: string;

  @Column()
  corequisite?: string;

  @Column()
  workload?: string;
}
