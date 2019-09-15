import { hashSync } from "bcryptjs";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRole } from "../types/users";

export class Initial1568394110733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.save([
      createAdmin("shawnkoh"),
      createAdmin("liaujianjie"),
      createAdmin("elmoose"),
      createAdmin("anh2111htd"),
      createAdmin("BransonNg")
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
  user.email = username + "@nusreviews.com";
  user.isVerified = true;
  user.role = UserRole.ADMIN;
  return user;
}
