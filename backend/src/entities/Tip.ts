import { IsOptional, IsString, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { ModuleSemester } from "./ModuleSemester";
import { TipVote } from "./TipVote";

@Entity()
export class Tip extends Discardable {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.tips)
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

  @OneToMany(type => TipVote, tipVote => tipVote.tip)
  tipVotes!: TipVote[];

  entityName = "Tip";
}
