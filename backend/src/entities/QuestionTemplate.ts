import { Entity, OneToMany, ManyToOne, Column } from "typeorm";
import { Discardable } from "./Discardable";
import { Question } from "./Question";
import { ReviewTemplate } from "./ReviewTemplate";
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

@Entity()
export class QuestionTemplate extends Discardable {
  @ManyToOne(
    type => ReviewTemplate,
    reviewTemplate => reviewTemplate.metricTemplates
  )
  reviewTemplate!: ReviewTemplate;

  @Column()
  @IsNotEmpty()
  @IsString()
  question!: string;

  @Column()
  @IsOptional()
  @IsString()
  placeholder?: string;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  compulsory!: boolean;

  @OneToMany(type => Question, question => question.questionTemplate)
  questions!: Question[];
}
