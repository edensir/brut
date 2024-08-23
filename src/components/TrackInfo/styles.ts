import styled, { keyframes } from "styled-components";

export const H1 = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 10vh;
  padding-left: 0.5em;
  max-width: 50vw;
`;

export const slide = keyframes`
0% {
transform: translateX(+100%);}
100% {
transform: translateX(-100%);}
}
`;

export const TickerWrapper = styled.div`
  height: 30em;
  margin: 0;
  overflow: hidden;
  align-text: bottom;
`;

export const TickerContent = styled.div`
  font-size: 4vh;
  display: flex;
  justify-content: space-between;
  font-style: italic;
  animation: ${slide} 7s linear infinite;
  color: black;
`;
