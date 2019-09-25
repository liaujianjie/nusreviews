import {
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";
import { Entity, OneToMany, ManyToOne, Column } from "typeorm";
import { Discardable } from "./Discardable";
import { Metric } from "./Metric";
import { Question } from "./Question";
import { ReviewTemplate } from "./ReviewTemplate";
import { ModuleSemester } from "./ModuleSemester";
import { Grade } from "../types/reviews";

@Entity()
export class Review extends Discardable {
  @ManyToOne(type => ReviewTemplate, reviewTemplate => reviewTemplate.reviews)
  @IsNotEmpty()
  reviewTemplate!: ReviewTemplate;

  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.reviews)
  @IsNotEmpty()
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

  @OneToMany(type => Metric, metric => metric.review, { cascade: true })
  metrics!: Metric[];

  @OneToMany(type => Question, question => question.review, { cascade: true })
  questions!: Question[];

  // Use () => {} to make sure the context of `this` doesnt change
  public stringify = () => {
    const metricStrings = this.metrics.map(metric => {
      delete metric.review;
      return metric;
    });

    const questionStrings = this.questions.map(question => {
      delete question.review;
      return question;
    });

    return {
      ...(this as Review),
      metrics: metricStrings,
      questions: questionStrings
    };
  };

  public setDiscardedAt = (discardedAt?: Date) => {
    this.discardedAt = discardedAt;
    this.metrics.forEach(metric => (metric.discardedAt = discardedAt));
    this.questions.forEach(question => (question.discardedAt = discardedAt));
  };

  entityName = "Review";
}
