import { Entity, OneToMany, ManyToOne } from "typeorm";
import { Discardable } from "./Discardable";
import { ReviewTemplate } from "./ReviewTemplate";

@Entity()
export class QuestionTemplate extends Discardable {
  @ManyToOne(
    type => ReviewTemplate,
    reviewTemplate => reviewTemplate.metricTemplates
  )
  reviewTemplate!: ReviewTemplate;
}
