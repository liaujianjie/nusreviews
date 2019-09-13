import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User, UserRole } from "../entities/User";
import { hashSync } from "bcryptjs";

export class Initial1568394110733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    user.username = "admin";
    user.password = hashSync("setMeUp?");
    user.email = "admin@nusreviews.com";
    user.isVerified = true;
    user.role = UserRole.ADMIN;
    const userRepository = getRepository(User);
    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
