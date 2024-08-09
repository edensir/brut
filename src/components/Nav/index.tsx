import { redirectToAuthCodeFlow } from "../../Auth";

interface IProp {
  profile?: string;
}

const Nav: React.FC<IProp> = ({ profile }) => {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const handleClick = async () => {
    await redirectToAuthCodeFlow(clientId);
  };

  return (
    <>
      <h1>ONLIFE RADIO</h1>
      {!profile ? (
        <button onClick={handleClick}>Login</button>
      ) : (
        <img src={profile}></img>
      )}
    </>
  );
};

export default Nav;
