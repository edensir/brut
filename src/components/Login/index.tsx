import Nav from "../Nav";
import { Container, Right, Left, P } from "./styles";

const Login: React.FC = () => {
  return (
    <>
      <Nav></Nav>
      <Container>
        <Left>
          <P>music player</P>
          <P>be online in life</P>
        </Left>
        <Right>
          <P>designed with lurrrv for music and connections</P>
          <P>* spotify account is required.</P>
        </Right>
      </Container>
    </>
  );
};

export default Login;
