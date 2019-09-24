import { UserRole } from "./users";

export type BearerToken = string;

export enum BearerTokenType {
  AccessToken,
  RefreshToken,
  EntityToken
}

type Payload<BearerTokenType> = {
  type: BearerTokenType;
};

type TokenLifespan = {
  iat: number;
  exp: number;
};

type Credentials = {
  userId: number;
  username: string;
  userRole: UserRole;
};

export type AccessTokenPayload = Payload<BearerTokenType.AccessToken> &
  Credentials;
export type AccessTokenSignedPayload = AccessTokenPayload & TokenLifespan;

export type RefreshTokenPayload = Payload<BearerTokenType.RefreshToken> &
  Credentials;
export type RefreshTokenSignedPayload = RefreshTokenPayload & TokenLifespan;

export type EntityTokenPayload<Entity> = Payload<BearerTokenType.EntityToken> &
  Partial<Entity>;
export type EntityTokenSignedPayload<Entity> = EntityTokenPayload<Entity> &
  TokenLifespan;

// Type checkers

export function isBearerToken(token: string): token is BearerToken {
  const words = token.split(" ");
  return words[0] === "Bearer" && !!words[1];
}

function isPayload<T>(payload: any): payload is Payload<T> {
  return payload.type in BearerTokenType;
}

function hasTokenLifespan(payload: any) {
  return typeof payload.iat === "number" && typeof payload.exp === "number";
}

function hasCredentials(payload: any) {
  return (
    typeof payload.userId === "number" &&
    typeof payload.username === "string" &&
    Object.values(UserRole).includes(payload.userRole)
  );
}

export function isAccessTokenPayload(
  payload: any
): payload is AccessTokenPayload {
  return (
    isPayload(payload) &&
    payload.type === BearerTokenType.AccessToken &&
    hasCredentials(payload)
  );
}

export function isAccessTokenSignedPayload(
  payload: any
): payload is AccessTokenSignedPayload {
  return isAccessTokenPayload(payload) && hasTokenLifespan(payload);
}

export function isRefreshTokenPayload(
  payload: any
): payload is RefreshTokenPayload {
  return (
    isPayload(payload) &&
    payload.type === BearerTokenType.RefreshToken &&
    hasCredentials(payload)
  );
}

export function isRefreshTokenSignedPayload(
  payload: any
): payload is RefreshTokenSignedPayload {
  return isRefreshTokenPayload(payload) && hasTokenLifespan(payload);
}

export function isEntityTokenPayload<Entity>(
  payload: any
): payload is EntityTokenPayload<Entity> {
  return isPayload(payload) && payload.type === BearerTokenType.EntityToken;
}

export function isEntityTokenSignedPayload<Entity>(
  payload: any
): payload is EntityTokenSignedPayload<Entity> {
  return isEntityTokenPayload(payload) && hasTokenLifespan(payload);
}
