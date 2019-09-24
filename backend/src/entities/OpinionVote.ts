import { IsIn } from "class-validator";
import { Column, Entity, ManyToOne, Index } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";
import { Opinion } from "./Opinion";

@Entity()
@Index(["user", "opinion"], { unique: true })
export class OpinionVote extends Base {
  @ManyToOne(type => User, user => user.opinionVotes)
  user!: User;

  @ManyToOne(type => Opinion, opinion => opinion.opinionVotes)
  opinion!: Opinion;

  @Column()
  @IsIn([1, -1])
  value!: number;

  entityName = "OpinionVote";
}
