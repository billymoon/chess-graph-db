import getFilesystemClient from "./get-filesystem-client";

const client = getFilesystemClient();

export const fetchAllDocuments = () =>
  client.fetch(`* | order(_createdAt asc)`);

export const fetchDocumentByIdWithIncomingAndOutgoing = (_id) =>
  client.fetch(`{
    "selected": *[_id == "${_id}"]
}{
  selected,
  "incomingIds": array::unique(selected[]{
    "aggregator": *[references(^._id)]._id
  }.aggregator[]),
  "outgoingIds": array::compact(array::unique(selected[]{
    "aggregator": *{
      "innerAggregator": [^]{ // ^ refers to current selected
        ...select(references(^._id) => ^) // ^ refers to current *
      }._id
    }.innerAggregator[]
  }.aggregator[]))
}
{
    selected,
  "incoming": *[_id in ^.incomingIds],
  "outgoing": *[_id in ^.outgoingIds],
}`);
