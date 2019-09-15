import { hashSync, compareSync } from "bcryptjs";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { JwtSignedPayload } from "../types/jwt";
import { getJwtString } from "../utils/jwt";

const userRepository = () => getRepository(User);

export async function create(request: Request, response: Response) {
  const user = new User();

  user.username = request.body.username;
  user.password = request.body.password;
  user.email = request.body.email;

  const errors = await validate(user);
  if (errors.length > 0) {
    response.status(400).send();
    console.error("UsersController.create: " + errors);
    return;
  }

  user.password = hashSync(user.password!);

  try {
    await userRepository().save(user);
  } catch (error) {
    response.status(400).send();
    console.error(error);
    return;
  }

  const result = { ...user, jwt: getJwtString(user) };
  delete result.password;
  response.status(200).send(result);
}

/**
 * Handles a user login request. A User can login using his email or username.
 */
export async function login(request: Request, response: Response) {
  if (!request.headers.authorization) {
    response.status(400).send();
    return;
  }
  const b64auth = request.headers.authorization.split(" ")[1];
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  const user = await userRepository()
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.username = :login OR user.email = :login", { login })
    .getOne();

  if (user === undefined || user.password === undefined) {
    response.status(401).send();
    console.error("UsersController.login failed: Invalid login");
    return;
  }

  if (!compareSync(password, user.password)) {
    response.status(401).send();
    console.error("UsersController.login failed: Invalid password");
    return;
  }

  const token = getJwtString(user);
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

  const newToken = getJwtString(user);
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
    console.error("UsersController.resetPassword: " + errors);
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

export async function remove(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userToRemove = await userRepository().findOne(request.params.id);
  if (userToRemove === undefined) {
    response.status(400).send();
    console.error("UsersController.remove failed: userToRemove is undefined");
    return;
  }
  await userRepository().remove(userToRemove);
  response.status(200).send();
}
