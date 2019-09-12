import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Discardable {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  discarded_at: Date;
}
