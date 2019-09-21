import { Entity, ManyToOne } from "typeorm";
import { Discardable } from "./Discardable";
import { QuestionTemplate } from "./QuestionTemplate";
import { Review } from "./Review";

@Entity()
export class Question extends Discardable {
  @ManyToOne(
    type => QuestionTemplate,
    questionTemplate => questionTemplate.questions
  )
  questionTemplate!: QuestionTemplate;

  @ManyToOne(type => Review, review => review.questions)
  review!: Review;
}
