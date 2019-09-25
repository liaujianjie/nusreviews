import * as jwt from "jsonwebtoken";
import * as sendgrid from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";
import { User } from "../entities/User";
import { Base } from "../entities/Base";
import {
  AccessTokenSignedPayload,
  BearerTokenType,
  ResetPasswordTokenPayload
} from "../types/tokens";

const baseUrl = "https://nus.reviews";

export function sendVerificationEmail(user: User) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

  const payload = user.createPayload();

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7 days"
  });

  const msg: MailData = {
    to: user.email,
    from: "mail@nus.reviews",
    subject: "Welcome to nusreviews!",
    text: `Welcome ${user.username} Send a POST request to ${baseUrl}/api/v1/verify_email/${token}`,
    html: `Welcome ${user.username} Send a POST request to ${baseUrl}/api/v1/verify_email/${token}`
  };
  sendgrid.send(msg);
}

export function sendResetPasswordEmail(user: User) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

  const payload: ResetPasswordTokenPayload = {
    type: BearerTokenType.ResetPasswordToken,
    id: user.id,
    email: user.email,
    role: user.role,
    username: user.username
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "3 hours"
  });

  const message = `We heard that you lost your nus.reviews password. Sorry about that!

But don’t worry! You can use the following link to reset your password:


${baseUrl}/reset_password/${token}

If you don’t use this link within 3 hours, it will expire. To get a new password reset link, visit ${baseUrl}/auth/reset-password


Thanks,
The nus.reviews team`;

  const data: MailData = {
    to: user.email,
    from: "mail@nus.reviews",
    subject: "[nus.reviews] Please reset your password",
    text: message,
    html: `<pre>${message}</pre>`
  };

  sendgrid.send(data);
}

export function sendEntityEmail<Entity extends Base>(
  accessTokenSignedPayload: AccessTokenSignedPayload,
  entity: Entity,
  token?: string
) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

  token =
    token ||
    jwt.sign(entity.createPayload(), process.env.JWT_SECRET!, {
      expiresIn: "7 days"
    });

  const msg: MailData = {
    to: accessTokenSignedPayload.email,
    from: "mail@nus.reviews",
    subject: `Thanks for creating a ${entity.entityName}!`,
    // Todo: use email template
    text: `Thanks ${accessTokenSignedPayload.username} for creating a ${
      entity.entityName
    }! You may edit it by sending a POST request to ${baseUrl}/api/v1/edit_${entity.entityName.toLowerCase()}/${token}`,
    html: `Thanks ${accessTokenSignedPayload.username} for creating a ${
      entity.entityName
    }! You may edit it by sending a POST request to ${baseUrl}/api/v1/edit_${entity.entityName.toLowerCase()}/${token}`
  };
  sendgrid.send(msg);
}
