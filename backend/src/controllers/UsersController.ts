import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";
import { validate } from "class-validator";
import { hashSync } from "bcryptjs";
import { JwtPayload, JWT_SIGN_OPTIONS, JwtSignedPayload } from "../types";

const userRepository = () => getRepository(User);

export function getJwtPayload(user: User): JwtPayload {
  return {
    userId: user.id,
    username: user.username,
    userRole: user.role
  };
}

const getToken = (payload: JwtPayload) =>
  jwt.sign(payload, jwtSecret, JWT_SIGN_OPTIONS);

/**
 * Handles a user login request. A User can login using his email or username.
 */
export async function login(request: Request, response: Response) {
  if (!request.headers.authorization) {
    response.status(400).send();
    return;
  }

  const b64auth = request.headers.authorization.split(" ")[1];
  const [login, password] = new Buffer(b64auth, "base64").toString().split(":");

  const user = await userRepository()
    .createQueryBuilder()
    .select("user.id", "user.email")
    .addSelect("user.password")
    .where("user.username = :username", { username: login })
    .orWhere("user.email = :email", { email: login })
    .getOne();

  if (user == null) {
    response.status(401).send();
    console.error("UsersController.login failed: Invalid login");
    return;
  }

  // .findOneOrFail({
  // where: [{ username: login }, { email: login }]
  // });

  if (!user.isPasswordValid(password)) {
    response.status(401).send();
    console.error("UsersController.login failed: Invalid password");
    return;
  }

  const payload = getJwtPayload(user);
  const token = getToken(payload);
  response.status(200).send(token);
}

export async function requestJwt(request: Request, response: Response) {
  const payload = response.locals.jwtPayload as JwtSignedPayload;
  const id = payload.userId;

  let user: User;
  try {
    user = await userRepository().findOneOrFail(id);
  } catch (error) {
    response.status(400).send();
    return;
  }

  const newPayload = getJwtPayload(user);
  const newToken = getToken(newPayload);
  response.status(200).send(newToken);
}

export async function resetPassword(request: Request, response: Response) {
  const id = response.locals.jwtPayload.userId;

  const { oldPassword, newPassword } = request.body;
  if (!oldPassword || !newPassword) {
    response.status(400).send();
    return;
  }

  let user: User;
  try {
    user = await userRepository().findOneOrFail(id);
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
  await userRepository().save(user);
  response.status(200).send();
}

export async function all(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log("all");
  const result = await userRepository().find();
  response.status(200).send(result);
}

export async function one(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const result = await userRepository().findOne(request.params.id);
  response.status(200).send(result);
}

export async function save(
  request: Request,
  response: Response,
  next: NextFunction
) {
  await userRepository().save(request.body);
  response.status(200).send();
}

export async function remove(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userToRemove = await userRepository().findOne(request.params.id);
  await userRepository().remove(userToRemove);
  response.status(200).send();
}
