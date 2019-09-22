import { sign } from "jsonwebtoken";
import { Opinion } from "../entities/Opinion";
import { Tip } from "../entities/Tip";

// export type EditableEntity = Opinion | Review | Tip;
export type EditableEntity = Opinion | Tip;

export enum EditableEntityType {
  Opinion = "OPINION",
  Tip = "TIP",
  Review = "REVIEW"
}

export interface EditTokenPayload {
  type: EditableEntityType;
  entityId: number;
}

export interface EditTokenSignedPayload extends EditTokenPayload {
  iat: number;
  exp: number;
}

export function isEditTokenPayload(object: any): object is EditTokenPayload {
  return (
    object.hasOwnProperty("entityId") &&
    typeof object.entityId === "number" &&
    object.hasOwnProperty("type") &&
    typeof object.type === "string"
  );
}

export function isEditTokenSignedPayload(
  object: any
): object is EditTokenSignedPayload {
  return (
    object.hasOwnProperty("iat") &&
    typeof object.iat === "number" &&
    object.hasOwnProperty("exp") &&
    typeof object.exp === "number" &&
    isEditTokenPayload(object)
  );
}

export function generateEditToken(
  entity: EditableEntity,
  expiresIn: string | number
) {
  let type;
  if (entity instanceof Opinion) {
    type = EditableEntityType.Opinion;
  } else if (entity instanceof Tip) {
    type = EditableEntityType.Tip;
  } else {
    type = EditableEntityType.Review;
  }

  const payload: EditTokenPayload = {
    entityId: entity.id,
    type
  };
  return sign(payload, process.env.JWT_SECRET!, { expiresIn });
}
