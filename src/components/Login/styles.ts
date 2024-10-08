import styled from "styled-components";
import Hero from "../../assets/onliferadio.jpg";

export const Container = styled.div`
display: flex;
width 100vw;
min-height: 86vh;
background: white;
background-image: url(${Hero});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
overflow: hidden;
`;

export const Right = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  color: black;
`;

export const Left = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 2em;
  margin-top: 1em;
  margin-bottom: 2em;
  color: black;
`;
export const P = styled.p`
  margin-top: 1em;
  margin-bottom: 2em;
  margin-left: 2em;
  margin-right: 1em;
  color: white;
`;
