import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { ModuleSemester } from "./ModuleSemester";
import { TipVote } from "./TipVote";

@Entity()
export class Tip extends Discardable {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.tips)
  moduleSemester!: ModuleSemester;

  @Column()
  description!: string;

  @OneToMany(type => TipVote, tipVote => tipVote.tip)
  tipVotes!: TipVote[];

  entityName = "Tip";
}
