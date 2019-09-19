import { IsNumber } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";
import { Opinion } from "./Opinion";

@Entity()
export class OpinionVote extends Base {
  @ManyToOne(type => User, user => user.opinionVotes)
  user!: User;

  @ManyToOne(type => Opinion, opinion => opinion.opinionVotes)
  opinion!: Opinion;

  @Column()
  @IsNumber()
  value!: number;
}
