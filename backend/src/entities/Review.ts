import { Entity, OneToMany, ManyToOne } from "typeorm";
import { Discardable } from "./Discardable";
import { Metric } from "./Metric";
import { Question } from "./Question";
import { ReviewTemplate } from "./ReviewTemplate";

@Entity()
export class Review extends Discardable {
  @ManyToOne(type => ReviewTemplate, reviewTemplate => reviewTemplate.reviews)
  reviewTemplate!: ReviewTemplate;

  @OneToMany(type => Metric, metric => metric.review)
  metrics!: Metric[];

  @OneToMany(type => Question, question => question.review)
  questions!: Question[];
}
