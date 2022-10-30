import fs from "fs";
import path from "path";
import getConfig from "next/config";
import { parse, evaluate } from "groq-js";

const { serverRuntimeConfig } = getConfig();

const getFilesystemClient = () => {
  const lines = fs
    .readFileSync(
      path.join(
        serverRuntimeConfig.rootDirname,
        serverRuntimeConfig.DATA_FILENAME
      )
    )
    .toString("utf8")
    .split("\n");
  const dataset = lines.map(JSON.parse);

  const filesystemFetch = async (query) => {
    const tree = parse(query);
    const value = await evaluate(tree, { dataset });
    return await value.get();
  };

  return {
    fetch: filesystemFetch,
  };
};

export default getFilesystemClient;
