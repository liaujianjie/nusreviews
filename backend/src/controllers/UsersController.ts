import { hashSync, compareSync } from "bcryptjs";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { getAuthenticationTokens } from "../utils/users";
import { JwtSignedPayload } from "../types/users";

export async function create(request: Request, response: Response) {
  try {
    const user = new User();
    user.username = request.body.username;
    user.password = request.body.password;
    user.email = request.body.email;

    await validateOrReject(user);
    user.password = hashSync(user.password!);
    await getRepository(User).save(user);
    const result = { ...user, ...getAuthenticationTokens(user) };
    delete result.password;
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send();
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
    response.status(200).send(userList);
  } catch (error) {
    response.status(400).send();
  }
}

export async function show(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const user = await getRepository(User).findOneOrFail(request.params.id);
    response.status(200).send(user);
  } catch (error) {
    response.status(400).send();
  }
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

  const repo = getRepository(User);
  const user = await repo
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.id = :id", { id })
    .getOne();

  if (!user || !user.password || !compareSync(oldPassword, user.password)) {
    response.status(400).send();
    return;
  }

  try {
    user.password = newPassword;
    await validateOrReject(user);
    await repo.update(id, { password: hashSync(newPassword) });
    response.status(200).send();
  } catch (error) {
    response.status(400).send();
    console.error(error);
  }
}

// export async function resetPassword(request: Request, response: Response) {

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
  } catch (error) {
    response.status(400).send();
    return;
  }
  response.status(200).send();
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
  } catch (error) {
    response.status(400).send();
    return;
  }
  response.status(200).send();
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

  const user = await getRepository(User)
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.username = :login OR user.email = :login", { login })
    .getOne();

  if (
    !user ||
    !user.password ||
    !compareSync(password, user.password) ||
    user.discardedAt
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
    user = await getRepository(User).findOneOrFail(payload.userId);
  } catch (error) {
    response.status(400).send();
    console.error(error);
    return;
  }

  const result = getAuthenticationTokens(user);
  response.status(200).send(result);
}
