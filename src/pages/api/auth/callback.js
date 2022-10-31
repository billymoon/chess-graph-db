import getConfig from "next/config";
import getBaseUrl from "~/utils/get-base-url";
import { decrypt } from "~/utils/crypt";

const { serverRuntimeConfig } = getConfig();

const apiHandler = async (req, res) => {
  const state = JSON.parse(decrypt(req.query.state));
  const details = {
    grant_type: "authorization_code",
    code: req.query.code,
    code_verifier: state.code_verifier,
    redirect_uri: `${getBaseUrl(req)}/api/auth/callback`,
    client_id: serverRuntimeConfig.LICHESS_CLIENT_ID,
  };

  const bodyArr = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    bodyArr.push(encodedKey + "=" + encodedValue);
  }
  const body = bodyArr.join("&");

  const token = await fetch("https://lichess.org/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  }).then((r) => r.json());

  res.json(token);
};

export default apiHandler;
