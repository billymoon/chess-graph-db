import { fetchDocumentByIdWithIncomingAndOutgoing } from "~/utils/fetcher";
import Renderer from "~/components/renderer";

const renderComponentListFactory = (docs) => (data) =>
  data.map(({ _id, _type, ...rest }) => (
    <li key={_id}>
      <Renderer docs={docs} _id={_id} _type={_type} {...rest} />
    </li>
  ));

const Page = ({ data }) => {
  const docs = [...data.selected, ...data.incoming, ...data.outgoing].reduce(
    (memo, current) => ({ ...memo, [current._id]: current }),
    {}
  );
  const renderComponentList = renderComponentListFactory(docs);

  return (
    <div>
      <ul>{renderComponentList(data.selected)}</ul>
      <h2>Outgoing</h2>
      <ul>{renderComponentList(data.outgoing)}</ul>
      <h2>Incoming</h2>
      <ul>{renderComponentList(data.incoming)}</ul>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      data: await fetchDocumentByIdWithIncomingAndOutgoing(params._id),
    },
  };
}

export default Page;
