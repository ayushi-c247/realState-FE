import UtilCookieService from "./cookie-service";
import UtilLocalService from "./localstorage";

interface User {
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export const getToken = (): string | null => {
  const tokenFromCookies = UtilCookieService.getCookie("token");
  const tokenFromLocalServices = UtilLocalService.getLocalStorage("token");
  return tokenFromCookies && typeof tokenFromLocalServices === "string"
    ? tokenFromLocalServices
    : null;
};

export const getInitialState = (key: string): string | null | Record<string, unknown> => {
  if (key === "token") {
    return getToken();
  } else {
    return UtilLocalService.getLocalStorage(key);
  }
};

export const setInitialState = (user: User): void => {
  UtilLocalService.setLocalStorage("email", user?.email ?? "");
  UtilLocalService.setLocalStorage("first_name", user?.first_name ?? "");
  UtilLocalService.setLocalStorage("last_name", user?.last_name ?? "");
  UtilLocalService.setLocalStorage("role", user?.role);
};

export const removeInitialState = (): void => {
  UtilCookieService.removeCookie("token");
  UtilCookieService.removeCookie("role");
  const localStorageKeys: string[] = ["email", "token", "first_name", "last_name", "role"];
  localStorageKeys.forEach((key) => UtilLocalService.removeLocalStorage(key));
};
