import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";
import * as bcryptjs from "bcryptjs";
import { Length, IsNotEmpty, IsEmail } from "class-validator";

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student"
}

@Entity()
export class User extends Discardable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  @IsNotEmpty()
  @Length(4, 100)
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.STUDENT
  })
  @IsNotEmpty()
  role: UserRole;

  @Column({
    unique: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  isVerified: boolean;

  @Column({
    nullable: true
  })
  faculty: string;

  @Column({
    nullable: true
  })
  major: string;

  @Column({
    nullable: true
  })
  academicYear: number;

  public isPasswordValid(password: string): boolean {
    return bcryptjs.compareSync(password, this.password);
  }
}
