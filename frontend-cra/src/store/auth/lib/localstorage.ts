// Local storage keys for the tokens
const LOCALSTORAGE_ACCESSTOKEN = "accessToken";
const LOCALSTORAGE_REFRESHTOKEN = "refreshToken";

export const clearTokensFromLocalStorage = () => {
  // Clear tokens persisted on local storage on sign out
  localStorage.removeItem(LOCALSTORAGE_ACCESSTOKEN);
  localStorage.removeItem(LOCALSTORAGE_REFRESHTOKEN);
};

export const saveTokensToLocalStorage = (tokens: {
  encodedAccessToken: string;
  encodedRefreshToken: string;
}) => {
  localStorage.setItem(LOCALSTORAGE_ACCESSTOKEN, tokens.encodedAccessToken);
  localStorage.setItem(LOCALSTORAGE_REFRESHTOKEN, tokens.encodedRefreshToken);
};

export const loadTokensFromLocalStorage = ():
  | {
      encodedAccessToken: string;
      encodedRefreshToken: string;
    }
  | undefined => {
  const encodedAccessToken = localStorage.getItem(LOCALSTORAGE_ACCESSTOKEN);
  const encodedRefreshToken = localStorage.getItem(LOCALSTORAGE_REFRESHTOKEN);

  // Guard against empty tokens
  if (!encodedAccessToken || !encodedRefreshToken) {
    return;
  }

  return {
    encodedAccessToken,
    encodedRefreshToken
  };
};
