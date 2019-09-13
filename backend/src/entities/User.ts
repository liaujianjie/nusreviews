import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Discardable } from "./Discardable";
import * as bcryptjs from "bcryptjs";
import { Length, IsNotEmpty, IsEmail } from "class-validator";

@Entity()
export class User extends Discardable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  @Length(4, 100)
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column({
    unique: true
  })
  @IsEmail()
  email: string;

  @Column()
  isVerified: boolean;

  @Column()
  faculty: string;

  @Column()
  major: string;

  @Column()
  academicYear: number;

  public isPasswordValid(password: string): boolean {
    return bcryptjs.compareSync(password, this.password);
  }
}
