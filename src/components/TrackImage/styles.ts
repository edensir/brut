import styled from "styled-components";

export const Box = styled.div`
  min-width: 90%;
  background: black;
  min-height: 40vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IImageProps {
  image: string;
}

export const Image = styled.div<IImageProps>`
  height: 70%;
  width: 90%;
  filter: grayscale(1);
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
`;

export default Box;
