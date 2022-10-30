import { fetchDocumentByIdWithIncomingAndOutgoing } from "~/utils/fetcher";

const endpoint = async ({ query }, res) => {
  res.json(await fetchDocumentByIdWithIncomingAndOutgoing(query._id));
};

export default endpoint;
