import { IsIn } from "class-validator";
import { Column, Entity, ManyToOne, Index } from "typeorm";
import { Base } from "./Base";
import { Tip } from "./Tip";
import { User } from "./User";

@Entity()
@Index(["user", "tip"], { unique: true })
export class TipVote extends Base {
  @ManyToOne(type => User, user => user.tipVotes)
  user!: User;

  @ManyToOne(type => Tip, tip => tip.tipVotes)
  tip!: Tip;

  @Column()
  @IsIn([1, -1])
  value!: number;

  entityName = "TipVote";
}
