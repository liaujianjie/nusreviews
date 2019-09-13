import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Discardable {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: true
  })
  discardedAt: Date;
}
