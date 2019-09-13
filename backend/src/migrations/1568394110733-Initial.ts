import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User, UserRole } from "../entities/User";
import { hashSync } from "bcryptjs";

export class Initial1568394110733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.save(this.createAdmin("shawnkoh"));
    await userRepository.save(this.createAdmin("liaujianjie"));
    await userRepository.save(this.createAdmin("elmoose"));
    await userRepository.save(this.createAdmin("anh2111htd"));
    await userRepository.save(this.createAdmin("BransonNg"));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // ignore; initial migration
  }

  private createAdmin(username: string): User {
    let user = new User();
    user.username = username;
    user.password = hashSync("setMeUp?");
    user.email = username + "@nusreviews.com";
    user.isVerified = true;
    user.role = UserRole.ADMIN;
    return user;
  }
}
