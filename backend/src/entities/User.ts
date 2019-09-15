import { Length, IsNotEmpty, IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";
import { UserRole } from "../types/users";

@Entity()
export class User extends Discardable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true
  })
  @IsNotEmpty()
  @Length(4, 100)
  username!: string;

  @Column({
    select: false
  })
  @IsNotEmpty()
  password?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Student
  })
  @IsNotEmpty()
  role: UserRole = UserRole.Student;

  @Column({
    unique: true
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Column({
    default: false
  })
  @IsNotEmpty()
  isVerified: boolean = false;

  @Column({
    nullable: true
  })
  faculty?: string;

  @Column({
    nullable: true
  })
  major?: string;

  @Column({
    nullable: true
  })
  academicYear?: number;
}
