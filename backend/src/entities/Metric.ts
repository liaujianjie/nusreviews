import { IsNotEmpty, IsNumber } from "class-validator";
import { Entity, ManyToOne, Column } from "typeorm";
import { Discardable } from "./Discardable";
import { MetricTemplate } from "./MetricTemplate";
import { Review } from "./Review";

@Entity()
export class Metric extends Discardable {
  @ManyToOne(type => MetricTemplate, metricTemplate => metricTemplate.metrics)
  metricTemplate!: MetricTemplate;

  @ManyToOne(type => Review, review => review.metrics)
  review!: Review;

  // Need to validate that value >= metricTemplate.min and <= metricTemplate.max
  // Has to be done manually (in the controller) because of Javascript's limitation
  @Column()
  @IsNotEmpty()
  @IsNumber()
  value!: number;
}
