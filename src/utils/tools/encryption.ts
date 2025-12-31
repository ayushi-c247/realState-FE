const base64Key = process.env.NEXT_PUBLIC_SHARED_SECRET_KEY_BASE64 as string;

/**
 * AES-GCM encrypts an object with the shared key
 * @param payload - `{ email: string; partnerType: string }`
 * @param base64Key - Base64-encoded 32-byte key
 * @returns encrypted token with `ivB64.cipherB64`
 */
export async function encryptPayload(payload: {
  email: string;
  partnerType: string;
}): Promise<string> {
  if (!base64Key) throw new Error("Shared key not found");
  const keyBytes = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt"]);

  const plainBuffer = new TextEncoder().encode(JSON.stringify(payload));

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cipherBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, plainBuffer);

  const ivB64 = btoa(String.fromCharCode(...iv));
  const cipherB64 = btoa(String.fromCharCode(...new Uint8Array(cipherBuffer)));
  return `${ivB64}.${cipherB64}`;
}

/**
 * AES-GCM decrypts an ivB64.cipherB64 token with the shared key
 * @param token - `${ivB64}.${cipherB64}`
 * @param base64Key - Base64-encoded 32-byte key
 * @returns decrypted object with `email` and `partnerType`
 */
export async function decryptPayload(
  token: string,
): Promise<{ email: string; partnerType: string }> {
  if (!base64Key) throw new Error("Shared key not found");
  const [ivB64, cipherB64] = token.split(".");
  if (!ivB64 || !cipherB64) throw new Error("Invalid token format");

  const keyBytes = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["decrypt"]);

  const iv = Uint8Array.from(atob(ivB64), (c) => c.charCodeAt(0));
  const cipher = Uint8Array.from(atob(cipherB64), (c) => c.charCodeAt(0));

  const plainBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, cryptoKey, cipher);

  const text = new TextDecoder().decode(plainBuffer);
  return JSON.parse(text);
}
