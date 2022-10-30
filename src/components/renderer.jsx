import NextLink from "next/link";

const Location = ({ Location, _id }) => (
  <div>
    <NextLink href={`./${_id}`}>Location</NextLink>: {Location}
  </div>
);
const Player = ({ fullname, lichessUsername, _id }) => (
  <div>
    <NextLink href={`./${_id}`}>Player</NextLink>: {fullname} (
    <a href={`https://lichess.org/@/${lichessUsername}`}>{lichessUsername}</a>)
  </div>
);
const Game = ({ site, whitePlayer, blackPlayer, docs, _id }) => (
  <div>
    <NextLink href={`./${_id}`}>Game</NextLink>: {site._ref}{" "}
    {docs[whitePlayer._ref]?.fullname} vs {docs[blackPlayer._ref]?.fullname}
  </div>
);
const Site = ({ name, _id }) => (
  <div>
    <NextLink href={`./${_id}`}>Site</NextLink>: <a href={name}>{name}</a>
  </div>
);

const Renderer = ({ _type, ...rest }) => {
  const ComponentToRender = {
    location: Location,
    player: Player,
    game: Game,
    site: Site,
  }[_type];

  return <ComponentToRender {...rest} />;
};

export default Renderer;
