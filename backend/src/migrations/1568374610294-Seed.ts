import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entities/User";
import { hashSync } from "bcryptjs";

export class Seed1568374610294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    user.username = "admin";
    user.password = hashSync("setMeUp?");
    user.email = "admin@nusreviews.com";
    user.role = "ADMIN";
    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // ignore; seed file
  }
}
