let authTokenGetter: (() => string | null) | null = null;

export function setAuthTokenGetter(getter: () => string | null) {
  authTokenGetter = getter;
}

export function getAuthToken(): string | null {
  if (!authTokenGetter) {
    return null;
  }
  return authTokenGetter();
}
