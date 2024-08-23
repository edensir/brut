import { ITrack } from "../../types";
import { H1, TickerWrapper, TickerContent } from "./styles";

interface IProps {
  track: ITrack | null;
}

const TrackInfo: React.FC<IProps> = ({ track }) => {
  console.log("track: " + JSON.stringify(track, null, 2));
  if (!track || track.id === "") return null;

  return (
    <>
      <H1>{track?.name}</H1>
      {/* <H1>Artist {track?.artist}</H1> */}
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
