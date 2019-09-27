import { hashSync, compareSync } from "bcryptjs";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { AccessTokenSignedPayload } from "../types/tokens";
import {
  sendVerificationEmail,
  sendResetPasswordEmail
} from "../utils/sendgrid";

export async function create(request: Request, response: Response) {
  try {
    const user = new User();
    user.username = request.body.username;
    user.password = request.body.password;
    user.email = request.body.email;

    await validateOrReject(user);
    user.password = hashSync(user.password!);
    await getRepository(User).save(user);
    const domain = user.email.split("@")[1].toLowerCase();
    if (!domain.includes("nus.edu")) {
      throw new Error("Email is not from NUS");
    }

    sendVerificationEmail(user);

    const result = { ...user, ...user.createAuthenticationTokens() };
    delete result.password;
    response.status(201).json(result);
  } catch (error) {
    response.sendStatus(400);
    console.error(error);
  }
}

export async function index(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const userList = await getRepository(User).find();
    response.status(200).json(userList);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const user = await getRepository(User).findOneOrFail(request.params.id);
    response.status(200).json(user);
  } catch (error) {
    response.sendStatus(400);
  }
}

export async function changePassword(request: Request, response: Response) {
  const accessTokenSignedPayload = response.locals
    .payload as AccessTokenSignedPayload;
  const id = accessTokenSignedPayload.id;

  const oldPasswordB64 = request.body.oldPassword;
  const newPasswordB64 = request.body.newPassword;

  if (
    typeof oldPasswordB64 !== "string" ||
    typeof newPasswordB64 !== "string"
  ) {
    response.sendStatus(400);
    return;
  }

  const oldPassword = Buffer.from(oldPasswordB64, "base64").toString();
  const newPassword = Buffer.from(newPasswordB64, "base64").toString();

  const repo = getRepository(User);
  const user = await repo
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.id = :id", { id })
    .getOne();

  if (!user || !user.password || !compareSync(oldPassword, user.password)) {
    response.sendStatus(400);
    return;
  }

  try {
    user.password = newPassword;
    await validateOrReject(user);
    await repo.update(id, { password: hashSync(newPassword) });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
    console.error(error);
  }
}

export async function discard(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await getRepository(User).findOneOrFail(request.params.id);
    await getRepository(User).update(request.params.id, {
      discardedAt: new Date()
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
    return;
  }
}

export async function undiscard(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await getRepository(User).findOneOrFail(request.params.id);
    await getRepository(User).update(request.params.id, {
      discardedAt: undefined
    });
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(400);
    return;
  }
}

export async function requestResetPassword(
  request: Request,
  response: Response
) {
  try {
    const email = request.body.email;

    const user = await getRepository(User).findOneOrFail({
      where: { email }
    });

    sendResetPasswordEmail(user);
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(404);
    console.error(error);
  }
}
