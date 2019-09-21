import { Entity, ManyToOne } from "typeorm";
import { Discardable } from "./Discardable";
import { MetricTemplate } from "./MetricTemplate";
import { Review } from "./Review";

@Entity()
export class Metric extends Discardable {
  @ManyToOne(type => MetricTemplate, metricTemplate => metricTemplate.metrics)
  metricTemplate!: MetricTemplate;

  @ManyToOne(type => Review, review => review.metrics)
  review!: Review;
}
