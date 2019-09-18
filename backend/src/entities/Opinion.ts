import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./Base";
import { ModuleSemester } from "./ModuleSemester";

@Entity()
export class Opinion extends Base {
  @ManyToOne(type => ModuleSemester, moduleSemester => moduleSemester.opinions)
  moduleSemester!: ModuleSemester;

  @Column()
  editToken!: string;

  @Column()
  description!: string;
}
