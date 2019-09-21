import { Entity, OneToMany, ManyToOne } from "typeorm";
import { Discardable } from "./Discardable";
import { Metric } from "./Metric";
import { ReviewTemplate } from "./ReviewTemplate";

@Entity()
export class MetricTemplate extends Discardable {
  @ManyToOne(
    type => ReviewTemplate,
    reviewTemplate => reviewTemplate.metricTemplates
  )
  reviewTemplate!: ReviewTemplate;

  @OneToMany(type => Metric, metric => metric.metricTemplate)
  metrics!: Metric[];
}
