import { redirectToAuthCodeFlow } from "../../Auth";
import { NavBar, H1, Button, Profile } from "./styles";

interface IProp {
  profile?: string | null;
}

const Nav: React.FC<IProp> = ({ profile }) => {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const handleClick = async () => {
    await redirectToAuthCodeFlow(clientId);
  };

  return (
    <>
      <NavBar>
        <H1>Brut</H1>
        {!profile ? (
          <Button onClick={handleClick}>Login</Button>
        ) : (
          <Profile profile={profile} />
        )}
      </NavBar>
    </>
  );
};

export default Nav;
