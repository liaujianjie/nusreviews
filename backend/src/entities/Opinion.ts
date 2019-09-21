import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { ModuleSemester } from "./ModuleSemester";
import { OpinionVote } from "./OpinionVote";

@Entity()
export class Opinion extends Base {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.opinions)
  moduleSemester!: ModuleSemester;

  @Column()
  description!: string;

  @OneToMany(type => OpinionVote, opinionVote => opinionVote.opinion)
  opinionVotes!: OpinionVote[];
}
