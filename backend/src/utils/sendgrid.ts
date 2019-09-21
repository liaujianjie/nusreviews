import * as jwt from "jsonwebtoken";
import * as sendgrid from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";
import { User } from "../entities/User";

export interface VerifyEmailPayload {
  userId: number;
  email: string;
}

export interface VerifyEmailSignedPayload extends VerifyEmailPayload {
  iat: number;
  exp: number;
}

export function isVerifyEmailPayload(
  object: any
): object is VerifyEmailPayload {
  return typeof object.userId === "number" && typeof object.email === "string";
}

export function isVerifyEmailSignedPayload(
  object: any
): object is VerifyEmailSignedPayload {
  return (
    typeof object.iat === "number" &&
    typeof object.exp === "number" &&
    isVerifyEmailPayload(object)
  );
}

export function sendVerificationEmail(user: User) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

  const payload: VerifyEmailPayload = {
    userId: user.id,
    email: user.email
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7 days"
  });

  const msg: MailData = {
    // to: user.email,
    to: "shawnkoh@me.com",
    from: "mail@nus.reviews",
    subject: "Welcome to nusreviews!",
    text: `Welcome ${user.username} Click on this link to verify localhost:3000/api/v1/email_verification/${token}`,
    html: `Click on this <a href='localhost:3000/api/v1/email_verification/${token}'>link</a> to verify`
  };
  sendgrid.send(msg);
}
