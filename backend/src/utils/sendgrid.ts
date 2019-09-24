import * as jwt from "jsonwebtoken";
import * as sendgrid from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";
import { User } from "../entities/User";
import { Base } from "../entities/Base";
import { AccessTokenSignedPayload } from "../types/tokens";

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
    text: `Welcome ${user.username} Send a POST request to nus.reviews/api/v1/verify_email/${token}`,
    html: `Welcome ${user.username} Send a POST request to nus.reviews/api/v1/verify_email/${token}`
  };
  sendgrid.send(msg);
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
    }! You may edit it by sending a POST request to nus.reviews/api/v1/edit_${entity.entityName.toLowerCase()}/${token}`,
    html: `Thanks ${accessTokenSignedPayload.username} for creating a ${
      entity.entityName
    }! You may edit it by sending a POST request to nus.reviews/api/v1/edit_${entity.entityName.toLowerCase()}/${token}`
  };
  sendgrid.send(msg);
}
