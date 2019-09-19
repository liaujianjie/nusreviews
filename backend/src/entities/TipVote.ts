import { IsNumber } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { Tip } from "./Tip";
import { User } from "./User";

@Entity()
export class TipVote extends Base {
  @ManyToOne(type => User, user => user.tipVotes)
  user!: User;

  @ManyToOne(type => Tip, tip => tip.tipVotes)
  tip!: Tip;

  @Column()
  @IsNumber()
  value!: number;
}
