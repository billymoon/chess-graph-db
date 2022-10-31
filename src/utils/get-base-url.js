import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

// TODO: don't assume prod is https and local is http
// const getBaseUrl = (req) => `${req.connection.encrypted ? 'https' : 'http'}://${req.headers.host}`
const getBaseUrl = (req) =>
  `${serverRuntimeConfig.VERCEL ? "https" : "http"}://${req.headers.host}`;

export default getBaseUrl;
