import { hashSync } from "bcryptjs";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRole } from "../types/users";

export class Initial1568394110733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.save([
      createAdmin("shawn", "shawnkoh@me.com"),
      createAdmin("jianjie", "liaujianjie@gmail.com"),
      createAdmin("eloise", "limeloiseyy@gmail.com"),
      createAdmin("anh", "anhhuynh98@gmail.com"),
      createAdmin("branson", "entityTokenPayload")
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // ignore; initial migration
  }
}

function createAdmin(username: string, email: string): User {
  let user = new User();
  user.username = username;
  user.password = hashSync("setMeUp?");
  user.email = email;
  user.emailVerified = true;
  user.role = UserRole.Admin;
  return user;
}
