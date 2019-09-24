import * as _ from "lodash";

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT"
}

export const isUserRole = (object: any): object is UserRole =>
  _.some(_.values(UserRole), role => role === object);

export enum AuthenticationTokenType {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN"
}

export const isAuthenticationTokenType = (
  object: any
): object is AuthenticationTokenType =>
  _.some(_.values(AuthenticationTokenType), role => role === object);

export type AuthenticationToken = {
  type: AuthenticationTokenType;
  userId: number;
  // username: string;
  userRole: UserRole;
  iat: number;
  exp: number;
};

export const isAuthenticationToken = (
  object: any
): object is AuthenticationToken => {
  if (
    !object ||
    !isAuthenticationTokenType(object.type) ||
    !isUserRole(object.userRole) ||
    !_.isFinite(object.userId) ||
    !_.isFinite(object.iat) ||
    !_.isFinite(object.exp)
  ) {
    return false;
  }

  return true;
};

export interface AuthState {
  encodedAccessToken: string | null;
  encodedRefreshToken: string | null;
  accessToken: AuthenticationToken | null;
  refreshToken: AuthenticationToken | null;
  authenticating: boolean;
}

export enum AuthAction {
  SIGNUP_BEGIN = "AUTH::SIGNUP_BEGIN",
  SIGNUP_SUCCESS = "AUTH::SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "AUTH::SIGNUP_FAILURE",
  SIGNIN_BEGIN = "AUTH::SIGNIN_BEGIN",
  SIGNIN_SUCCESS = "AUTH::SIGNIN_SUCCESS",
  SIGNIN_FAILURE = "AUTH::SIGNIN_FAILURE",
  SIGNOUT = "AUTH::SIGNOUT",
  LOAD_FROM_LOCALSTORAGE = "AUTH::LOAD_FROM_LOCALSTORAGE"
}

type AuthStateWithoutLoadingState = Pick<
  AuthState,
  "encodedAccessToken" | "encodedRefreshToken" | "accessToken" | "refreshToken"
>;

interface AuthSignOutAction {
  type: typeof AuthAction.SIGNOUT;
}

interface AuthSignInBeginAction {
  type: typeof AuthAction.SIGNIN_BEGIN;
}
interface AuthSignInSuccessAction {
  type: AuthAction.SIGNIN_SUCCESS;
  payload: AuthStateWithoutLoadingState;
}
interface AuthSignInFailureAction {
  type: typeof AuthAction.SIGNIN_FAILURE;
}

interface AuthSignUpBeginAction {
  type: typeof AuthAction.SIGNUP_BEGIN;
}
interface AuthSignUpSuccessAction {
  type: typeof AuthAction.SIGNUP_SUCCESS;
  payload: AuthStateWithoutLoadingState;
}
interface AuthSignUpFailureAction {
  type: typeof AuthAction.SIGNUP_FAILURE;
}

interface AuthLoadFromLocalStorageAction {
  type: typeof AuthAction.LOAD_FROM_LOCALSTORAGE;
  payload?: AuthStateWithoutLoadingState;
}

export type AuthActionTypes =
  | AuthSignOutAction
  | AuthSignInBeginAction
  | AuthSignInSuccessAction
  | AuthSignInFailureAction
  | AuthSignUpBeginAction
  | AuthSignUpSuccessAction
  | AuthSignUpFailureAction
  | AuthLoadFromLocalStorageAction;
