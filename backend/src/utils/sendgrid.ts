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

  const message =
    "<p>Welcome aboard!</p>" +
    "<p>We're excited that you're joining us! Because we're here to help you be better informed about modules, we want to ensure that all the content on NUSREVIEWS is by NUS students. To achieve this, we have to ask you to verify your NUS email. Rest assured, all of your reviews are completely anonymous. We won't even know that you wrote them!</P>" +
    `<p>To get started writing reviews, please <a href='${baseUrl}/auth/verify-email/${token}'>verify your email now!</a></p>`;

  const msg: MailData = {
    to: user.email,
    from: "mail@nus.reviews",
    subject: "Welcome to nusreviews!",
    html: message
  };
  sendgrid.send(msg);
}

export function sendResetPasswordEmail(user: User) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

  const payload: ResetPasswordTokenPayload = {
    type: BearerTokenType.ResetPasswordToken,
    ...user.getCredentials()
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "3 hours"
  });

  const message =
    "<p>We heard that you lost your NUSREVIEWS password. Sorry about that!</p>" +
    "<p>But don’t worry! You can <a href=${baseUrl}/auth/reset-password/${token}>click here to reset your password</a></p>" +
    "<br />" +
    `<p>If you don’t use this link within 3 hours, it will expire. To get a new password reset link, visit ${baseUrl}/auth/reset-password</p>` +
    "<br />" +
    "<p>Thanks,<br />" +
    "The nus.reviews team`</p>";

  const data: MailData = {
    to: user.email,
    from: "mail@nus.reviews",
    subject: "[nus.reviews] Please reset your password",
    text: message,
    html: message
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

  const entityName = entity.entityName.toLowerCase();

  const message =
    `<p>Thanks for creating a ${entityName}!</p>` +
    "<p>Rest assured that your identity is anonymous! We do not store information about who created any content.</p>" +
    `<p>However, we understand that you may wish to change your thoughts, so we have generated a special link that allows you to edit or delete your ${entityName}.</p>` +
    "<p>Please take note that you will not be able to edit or delete your post should you lose this special link.</p>" +
    "<br />" +
    `<p>You may edit it by <a href='${baseUrl}/TODO/${token}'>clicking on this link</a></p>`;

  const msg: MailData = {
    to: accessTokenSignedPayload.email,
    from: "mail@nus.reviews",
    subject: `Thanks for creating a ${entity.entityName}!`,
    text: message,
    html: message
  };
  sendgrid.send(msg);
}
