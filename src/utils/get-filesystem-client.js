import { parse, evaluate } from "groq-js";
import dataset from "../../dataset.json";

const getFilesystemClient = () => {
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
