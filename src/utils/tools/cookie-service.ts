import Cookies from "js-cookie";

const UtilCookieService = {
  setCookie: (key: string, value: string): void => {
    Cookies.set(key, value);
  },
  getCookie: (key: string): string | null => {
    const data = Cookies.get(key);
    return data ?? null;
  },
  removeCookie: (key: string): void => {
    Cookies.remove(key);
  },
};

export default UtilCookieService;
