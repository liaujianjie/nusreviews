import {
  Length,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString
} from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { sign } from "jsonwebtoken";
import { Discardable } from "./Discardable";
import { TipVote } from "./TipVote";
import { OpinionVote } from "./OpinionVote";
import { UserRole } from "../types/users";
import {
  BearerTokenType,
  EntityTokenPayload,
  Credentials,
  RefreshTokenPayload,
  AccessTokenPayload
} from "../types/tokens";

@Entity()
export class User extends Discardable {
  @Column({ unique: true })
  @IsNotEmpty()
  @Length(4, 100)
  username!: string;

  @Column({ select: false })
  @IsNotEmpty()
  password?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.Student
  })
  @IsNotEmpty()
  role: UserRole = UserRole.Student;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Column({ default: false })
  @IsNotEmpty()
  emailVerified: boolean = false;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  faculty?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  major?: string;

  @OneToMany(type => OpinionVote, opinionVote => opinionVote.user)
  opinionVotes!: OpinionVote[];

  @OneToMany(type => TipVote, tipVote => tipVote.user)
  tipVotes!: TipVote[];

  createPayload = (): EntityTokenPayload<User> => ({
    type: BearerTokenType.EntityToken,
    entityName: this.entityName,
    id: this.id,
    email: this.email,
    role: this.role,
    username: this.username
  });

  getCredentials = (): Credentials => ({
    id: this.id,
    email: this.email,
    emailVerified: this.emailVerified,
    role: this.role,
    username: this.username
  });

  createAuthenticationTokens = () => {
    const credentials = this.getCredentials();
    const accessTokenPayload: AccessTokenPayload = {
      type: BearerTokenType.AccessToken,
      ...credentials
    };
    const accessToken = sign(accessTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "15m"
    });
    const refreshTokenPayload: RefreshTokenPayload = {
      type: BearerTokenType.RefreshToken,
      ...credentials
    };
    const refreshToken = sign(refreshTokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7 days"
    });

    return { accessToken, refreshToken };
  };

  entityName = "User";
}
