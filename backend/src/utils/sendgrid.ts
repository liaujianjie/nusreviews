import * as jwt from "jsonwebtoken";
import * as sendgrid from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";
import { User } from "../entities/User";
import { Base } from "../entities/Base";

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
  user: User,
  entity: Entity
) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

  const payload = user.createPayload();

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7 days"
  });

  const msg: MailData = {
    to: user.email,
    from: "mail@nus.reviews",
    subject: "Welcome to nusreviews!",
    text: `Thanks ${user.username} Send a POST request to nus.reviews/api/v1/verify_email/${token}`,
    html: `Thanks ${user.username} for creating a Send a POST request to nus.reviews/api/v1/verify_email/${token}`
  };
  sendgrid.send(msg);
}
