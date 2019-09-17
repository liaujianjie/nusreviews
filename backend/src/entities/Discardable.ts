import { Column } from "typeorm";
import { Base } from "./Base";

export abstract class Discardable extends Base {
  @Column({ nullable: true })
  discardedAt?: Date;
}
