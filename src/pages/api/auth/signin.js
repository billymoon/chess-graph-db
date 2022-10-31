import crypto from "node:crypto";
import getBaseUrl from "~/utils/get-base-url";
import getConfig from "next/config";
import { encrypt } from "~/utils/crypt";

const { serverRuntimeConfig } = getConfig();

// preference:read preference:write email:read challenge:read challenge:write challenge:bulk study:read study:write tournament:write
// racer:write puzzle:read team:read team:write team:lead follow:read follow:write msg:write board:play bot:play web:mod
const SCOPE =
  "preference:read email:read challenge:read study:read puzzle:read team:read follow:read";

const randomString = async () =>
  new Promise((resolve) =>
    crypto.randomBytes(128, (_, buffer) => resolve(buffer.toString("hex")))
  );

// https://stackoverflow.com/a/59913241/665261
function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.webcrypto.subtle.digest("SHA-256", data);
}
function base64urlencode(a) {
  return Buffer.from(
    String.fromCharCode.apply(null, new Uint8Array(a)),
    "binary"
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
async function pkce_challenge_from_verifier(verifier) {
  const hashed = await sha256(verifier);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
}

const apiHandler = async (req, res) => {
  const code_verifier = await randomString();
  const pkceChallenge = await pkce_challenge_from_verifier(code_verifier);
  const clientId = serverRuntimeConfig.LICHESS_CLIENT_ID;
  const callbackUrl = `${getBaseUrl(req)}/api/auth/callback`;
  const state = encrypt(JSON.stringify({ code_verifier }));
  const Location = `https://lichess.org/oauth?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&code_challenge_method=S256&code_challenge=${pkceChallenge}&state=${state}&scope=${SCOPE}`;
  res.writeHead(301, { Location }).end();
};

export default apiHandler;
