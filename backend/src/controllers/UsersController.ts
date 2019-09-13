import { NextFunction, Request, Response, response, request } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";
import config from "../config";
import { validate } from "class-validator";
import { hashSync } from "bcryptjs";

export class UsersController {
  private static userRepository = getRepository(User);

  public static async signIn(request: Request, response: Response) {
    let { username, password } = request.body;
    if (!(username && password)) {
      response.status(400).send();
      return;
    }

    let user: User;
    try {
      user = await this.userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      response.status(401).send();
      return;
    }

    if (!user.isPasswordValid(password)) {
      response.status(401).send();
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    response.send(token);
  }

  public static async resetPassword(request: Request, response: Response) {
    const id = response.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = request.body;
    if (!oldPassword || !newPassword) {
      response.status(400).send();
      return;
    }

    let user: User;
    try {
      user = await this.userRepository.findOneOrFail(id);
    } catch (error) {
      response.status(401).send();
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      response.status(400).send(errors);
      return;
    }

    user.password = hashSync(newPassword);
    this.userRepository.save(user);
  }

  public static async all(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.userRepository.find();
  }

  public static async one(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.userRepository.findOne(request.params.id);
  }

  public static async save(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.userRepository.save(request.body);
  }

  public static async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}
