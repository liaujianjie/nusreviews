import { IsNotEmpty, IsNumber, IsString, IsBoolean } from "class-validator";
import { Entity, OneToMany, ManyToOne, Column } from "typeorm";
import { Discardable } from "./Discardable";
import { Metric } from "./Metric";
import { ReviewTemplate } from "./ReviewTemplate";

@Entity()
export class MetricTemplate extends Discardable {
  @ManyToOne(
    type => ReviewTemplate,
    reviewTemplate => reviewTemplate.metricTemplates
  )
  @IsNotEmpty()
  reviewTemplate!: ReviewTemplate;

  @Column()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  compulsory!: boolean;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  minValue!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  minDescription!: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  maxValue!: number;

  @Column()
  @IsNotEmpty()
  maxDescription!: string;

  @OneToMany(type => Metric, metric => metric.metricTemplate)
  metrics!: Metric[];
}
