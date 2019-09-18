import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { ModuleSemester } from "./ModuleSemester";

@Entity()
export class Tip extends Base {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.tips)
  moduleSemester!: ModuleSemester;

  @Column()
  editToken!: string;

  @Column()
  description!: string;
}
