import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { ModuleSemester } from "./ModuleSemester";
import { TipVote } from "./TipVote";

@Entity()
export class Tip extends Base {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.tips)
  moduleSemester!: ModuleSemester;

  @Column()
  description!: string;

  @OneToMany(type => TipVote, tipVote => tipVote.tip)
  tipVotes!: TipVote[];
}
