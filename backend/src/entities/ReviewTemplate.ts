import { Entity, OneToMany } from "typeorm";
import { Discardable } from "./Discardable";
import { MetricTemplate } from "./MetricTemplate";
import { QuestionTemplate } from "./QuestionTemplate";
import { Review } from "./Review";

@Entity()
export class ReviewTemplate extends Discardable {
  @OneToMany(
    type => MetricTemplate,
    metricTemplate => metricTemplate.reviewTemplate
  )
  metricTemplates!: MetricTemplate[];

  @OneToMany(
    type => QuestionTemplate,
    questionTemplate => questionTemplate.reviewTemplate
  )
  questionTemplates!: QuestionTemplate[];

  @OneToMany(type => Review, review => review.reviewTemplate)
  reviews!: Review[];
}
