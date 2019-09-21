import { Entity, OneToMany, ManyToOne, Column } from "typeorm";
import { Discardable } from "./Discardable";
import { Metric } from "./Metric";
import { Question } from "./Question";
import { ReviewTemplate } from "./ReviewTemplate";
import { ModuleSemester } from "./ModuleSemester";
import { IsOptional, IsEnum } from "class-validator";
import { Grade } from "../types/reviews";

@Entity()
export class Review extends Discardable {
  @ManyToOne(type => ReviewTemplate, reviewTemplate => reviewTemplate.reviews)
  reviewTemplate!: ReviewTemplate;

  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.reviews)
  moduleSemester!: ModuleSemester;

  @Column({
    type: "enum",
    nullable: true,
    enum: Grade
  })
  @IsOptional()
  @IsEnum(Grade)
  expectedGrade?: Grade;

  @Column({
    type: "enum",
    nullable: true,
    enum: Grade
  })
  @IsOptional()
  @IsEnum(Grade)
  actualGrade?: Grade;

  @OneToMany(type => Metric, metric => metric.review)
  metrics!: Metric[];

  @OneToMany(type => Question, question => question.review)
  questions!: Question[];
}
