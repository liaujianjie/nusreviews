import { hashSync, compareSync } from "bcryptjs";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { getAuthenticationTokens } from "../utils/users";
import { JwtSignedPayload } from "../types/users";

const userRepository = () => getRepository(User);

export async function create(request: Request, response: Response) {
  const user = new User();

  user.username = request.body.username;
  user.password = request.body.password;
  user.email = request.body.email;

  const errors = await validate(user);
  if (errors.length > 0) {
    response.status(400).send(errors);
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

  const result = { ...user, ...getAuthenticationTokens(user) };
  delete result.password;
  response.status(200).send(result);
}

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

  if (
    user === undefined ||
    user.password === undefined ||
    !compareSync(password, user.password)
  ) {
    response.status(400).send();
    return;
  }

  const result = getAuthenticationTokens(user);
  response.status(200).send(result);
}

export async function refreshAuthentication(
  request: Request,
  response: Response
) {
  const payload = response.locals.jwtPayload as JwtSignedPayload;

  let user: User;
  try {
    user = await userRepository().findOneOrFail(payload.userId);
  } catch (error) {
    response.status(400).send();
    console.error(error);
    return;
  }

  const result = getAuthenticationTokens(user);
  response.status(200).send(result);
}

export async function changePassword(request: Request, response: Response) {
  const payload = response.locals.jwtPayload as JwtSignedPayload;
  const id = payload.userId;

  const oldPasswordB64 = request.body.oldPassword;
  const newPasswordB64 = request.body.newPassword;

  if (
    typeof oldPasswordB64 !== "string" ||
    typeof newPasswordB64 !== "string"
  ) {
    response.status(400).send();
    console.log(request.headers);
    return;
  }

  const oldPassword = Buffer.from(oldPasswordB64, "base64").toString();
  const newPassword = Buffer.from(newPasswordB64, "base64").toString();

  const repo = userRepository();
  const user = await repo
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.id = :id", { id })
    .getOne();

  if (
    user === undefined ||
    user.password === undefined ||
    !compareSync(oldPassword, user.password)
  ) {
    response.status(400).send();
    return;
  }

  user.password = newPassword;
  const errors = await validate(user);
  if (errors.length > 0) {
    response.status(400).send(errors);
    return;
  }

  try {
    await repo.update(id, { password: hashSync(newPassword) });
  } catch (error) {
    response.status(400).send();
    console.error(error);
    return;
  }
  response.status(200).send();
}

// export async function resetPassword(request: Request, response: Response) {

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await userRepository().find();
  } catch (error) {
    response.status(400).send();
    return;
  }
  response.status(200).send(result);
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result;
  try {
    result = await userRepository().findOneOrFail(request.params.id);
  } catch (error) {
    response.status(400).send();
    return;
  }
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
    return;
  }
  await userRepository().remove(userToRemove);
  response.status(200).send();
}
