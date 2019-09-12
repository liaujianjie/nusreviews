import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";

@Entity()
export class User extends Discardable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20
  })
  username: string;

  @Column()
  password: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  isVerified: boolean;

  @Column()
  faculty: string;

  @Column()
  major: string;

  @Column()
  academicYear: number;
}
