import { hashSync } from "bcryptjs";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRole } from "../types/users";

export class Initial1568394110733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.save([
      createAdmin("shawn"),
      createAdmin("jianjie"),
      createAdmin("eloise"),
      createAdmin("anh"),
      createAdmin("branson")
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // ignore; initial migration
  }
}

function createAdmin(username: string): User {
  let user = new User();
  user.username = username;
  user.password = hashSync("setMeUp?");
  user.email = username + "@nus.reviews";
  user.emailVerified = true;
  user.role = UserRole.Admin;
  return user;
}
