import crypto from "crypto";

import logger from "./logger";

const WORKING_KEY = process.env.NEXT_PUBLIC_TEXT_ENCRYPT_KEY as string;
const SECRET = process.env.NEXT_PUBLIC_JSON_DECRYPT_KEY as string;

const textEncrypt = (plainText: string): string => {
  const m = crypto.createHash("md5");
  m.update(WORKING_KEY);
  const key = m.digest();
  // fixed IV as per your original code
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
      logger.error("Decryption error:", error.message);
    } else {
      logger.error("Decryption error:", error);
    }
    return null;
  }
};

const UtilLocalService = {
  setLocalStorage: (key: string, value: unknown): void => {
    // Encrypt both key and value to be stored
    const setKey = textEncrypt(JSON.stringify(key));
    const setValue = value !== null ? textEncrypt(JSON.stringify(value)) : "";
    if (typeof window !== "undefined") {
      localStorage.setItem(setKey, setValue);
    }
  },
  getLocalStorage: (key: string): string | null | Record<string, unknown> => {
    const setKey = textEncrypt(JSON.stringify(key));
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(setKey);
      if (data) {
        const decrypted = textDecrypt(data);
        return decrypted ? JSON.parse(decrypted) : null;
      }
    }
    return null;
  },
  removeLocalStorage: (key: string): void => {
    const setKey = textEncrypt(JSON.stringify(key));
    if (typeof window !== "undefined") {
      localStorage.removeItem(setKey);
    }
  },
};

export interface EncryptedData {
  iv: string;
  encrypted: string;
}

export const JSONDecrypt = (
  encryptedData: EncryptedData,
): Record<string, unknown> | string | null => {
  try {
    const key = Buffer.from(SECRET.substring(0, 32), "utf-8");
    const iv = Buffer.from(encryptedData.iv, "base64");
    const encrypted = Buffer.from(encryptedData.encrypted, "base64");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    const decodedJSON = JSON.parse(decrypted);
    return decodedJSON || "";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Decryption error:", error.message);
    } else {
      console.error("Decryption error:", error);
    }
    return null;
  }
};

export default UtilLocalService;
