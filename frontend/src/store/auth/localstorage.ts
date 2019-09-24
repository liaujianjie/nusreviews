/**
 * Represents a pair of access and refresh token
 */
type LocalStorageEncodedTokens = {
  encodedAccessToken: string;
  encodedRefreshToken: string;
};

// Local storage keys for the tokens
const LOCALSTORAGE_ACCESSTOKEN = "accessToken";
const LOCALSTORAGE_REFRESHTOKEN = "refreshToken";

export const clearTokensFromLocalStorage = () => {
  if (!window || window.localStorage) {
    return;
  }

  // Clear tokens persisted on local storage on sign out
  window.localStorage.removeItem(LOCALSTORAGE_ACCESSTOKEN);
  window.localStorage.removeItem(LOCALSTORAGE_REFRESHTOKEN);
};

export const saveTokensToLocalStorage = ({
  encodedAccessToken,
  encodedRefreshToken
}: LocalStorageEncodedTokens) => {
  if (!window || window.localStorage) {
    return;
  }

  window.localStorage.setItem(LOCALSTORAGE_ACCESSTOKEN, encodedAccessToken);
  window.localStorage.setItem(LOCALSTORAGE_REFRESHTOKEN, encodedRefreshToken);
};

export const loadTokensFromLocalStorage = ():
  | LocalStorageEncodedTokens
  | undefined => {
  if (!window || window.localStorage) {
    return;
  }

  const encodedAccessToken = window.localStorage.getItem(
    LOCALSTORAGE_ACCESSTOKEN
  );
  const encodedRefreshToken = window.localStorage.getItem(
    LOCALSTORAGE_REFRESHTOKEN
  );

  if (!encodedAccessToken || !encodedRefreshToken) {
    return;
  }

  return {
    encodedAccessToken,
    encodedRefreshToken
  };
};
