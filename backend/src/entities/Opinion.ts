import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { ModuleSemester } from "./ModuleSemester";
import { OpinionVote } from "./OpinionVote";

@Entity()
export class Opinion extends Discardable {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.opinions)
  moduleSemester!: ModuleSemester;

  @Column()
  description!: string;

  @OneToMany(type => OpinionVote, opinionVote => opinionVote.opinion)
  opinionVotes!: OpinionVote[];
}
