import getConfig from "next/config";
import crypto from "crypto";

const { serverRuntimeConfig } = getConfig();

const key = Buffer.from(serverRuntimeConfig.ENCRYPTION_KEY, "hex");
const iv = Buffer.from(serverRuntimeConfig.ENCRYPTION_IV, "hex");

export function encrypt(text) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

export function decrypt(text) {
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
