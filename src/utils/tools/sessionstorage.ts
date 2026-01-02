import crypto from "crypto";

import logger from "./logger";

const WORKING_KEY = process.env.NEXT_PUBLIC_TEXT_ENCRYPT_KEY as string;

const textEncrypt = (plainText: string): string => {
  const m = crypto.createHash("md5");
  m.update(WORKING_KEY);
  const key = m.digest();
  // fixed IV as per original implementation
  const iv = "\x0c\x0d\x0e\x0f\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b";
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encoded = plainText ? cipher.update(plainText, "utf8", "hex") : "";
  encoded += cipher.final("hex");
  return encoded;
};

const textDecrypt = (encText: string): string | null => {
  if (typeof encText !== "string" || encText === "") {
    return encText;
  }
  try {
    const m = crypto.createHash("md5");
    m.update(WORKING_KEY);
    const key = m.digest();
    const iv = "\x0c\x0d\x0e\x0f\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b";
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decoded = decipher.update(encText, "hex", "utf8");
    decoded += decipher.final("utf8");
    return decoded;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("SessionStorage decryption error:", error.message);
    } else {
      logger.error("SessionStorage decryption error:", error);
    }
    return null;
  }
};

const UtilSessionService = {
  setSessionStorage: (key: string, value: unknown): void => {
    const setKey = textEncrypt(JSON.stringify(key));
    const setValue = value !== null ? textEncrypt(JSON.stringify(value)) : "";
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(setKey, setValue);
    }
  },
  getSessionStorage: (key: string): string | null | Record<string, unknown> => {
    const setKey = textEncrypt(JSON.stringify(key));
    if (typeof window !== "undefined" && window.sessionStorage) {
      const data = window.sessionStorage.getItem(setKey);
      if (data) {
        const decrypted = textDecrypt(data);
        return decrypted ? JSON.parse(decrypted) : null;
      }
    }
    return null;
  },
  removeSessionStorage: (key: string): void => {
    const setKey = textEncrypt(JSON.stringify(key));
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.removeItem(setKey);
    }
  },
  clearSessionStorage: (): void => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.clear();
    }
  },
};

export default UtilSessionService;
