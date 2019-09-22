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
