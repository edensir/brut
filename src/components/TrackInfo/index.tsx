import { ITrack } from "../../types";
import {
  H1,
  TickerWrapper,
  TickerContent,
  Circle,
  Container,
  Text,
} from "./styles";

interface IProps {
  track: ITrack | null;
}

const TrackInfo: React.FC<IProps> = ({ track }) => {
  console.log("track: " + JSON.stringify(track, null, 2));
  if (!track || track.id === "") return null;

  const { artists = [] } = track;
  if (artists.length === 0) return null;

  const trackNameRepeated =
    artists[0].name.length > 10
      ? artists[0].name
      : (artists[0].name + "").repeat(4);

  // const trackArtist = artists[0].name;

  return (
    <>
      <Container>
        <Circle>
          {track.name.split("").map((char: string, index: number) => (
            <Text
              key={index}
              style={{
                transform: `rotate(${
                  (360 / trackNameRepeated.length) * index
                }deg) translate(0, -80px) rotate(${
                  (-360 / trackNameRepeated.length) * index
                }deg)`,
              }}
            >
              {char}
            </Text>
          ))}
        </Circle>
      </Container>{" "}
      <H1>{track?.name}</H1>
      <TickerWrapper>
        <TickerContent>
          {Array.isArray(track.artists)
            ? track.artists.map((artist) => artist.name).join(", ")
            : track.artist}
        </TickerContent>
      </TickerWrapper>
    </>
  );
};

export default TrackInfo;
