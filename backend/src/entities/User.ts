import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";
import * as bcryptjs from "bcryptjs";
import { Length, IsNotEmpty, IsEmail } from "class-validator";
import { UserRole } from "../types";

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

  @Column({
    select: false
  })
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

  @Column({
    default: false
  })
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
    console.log(password);
    console.log(this.password);
    return bcryptjs.compareSync(password, this.password);
  }
}
