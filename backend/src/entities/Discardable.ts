import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Discardable {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    type: "date",
    name: "discardedAt",
    nullable: true
  })
  discardedAt!: Date | null;
}
