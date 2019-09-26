import { IsString, IsOptional, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { ModuleSemester } from "./ModuleSemester";
import { OpinionVote } from "./OpinionVote";

@Entity()
export class Opinion extends Discardable {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.opinions)
  moduleSemester!: ModuleSemester;

  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  programmeYear?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  faculty?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  major?: string;

  @Column()
  description!: string;

  @OneToMany(type => OpinionVote, opinionVote => opinionVote.opinion)
  opinionVotes!: OpinionVote[];

  entityName = "Opinion";
}
