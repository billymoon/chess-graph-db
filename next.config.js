const serverDefaults = {
  DATA_FILENAME: "data.ndjson",
};

const serverRuntimeConfig = {
  rootDirname: __dirname,
  ...serverDefaults,
  ...Object.entries(process.env).reduce(
    (memo, [key, val]) =>
      Object.keys(serverDefaults).includes(key)
        ? { ...memo, [key]: val }
        : memo,
    {}
  ),
};

const publicKeys = ["NODE_ENV"];
const publicRuntimeConfig = Object.entries(serverRuntimeConfig).reduce(
  (memo, [key, val]) =>
    publicKeys.includes(key) ? { ...memo, [key]: val } : memo,
  {}
);

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
};

console.log(module.exports);
