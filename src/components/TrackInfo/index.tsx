import { ITrack } from "../../types";
import { H1 } from "./styles";

interface IProps {
  track: ITrack | null;
}

const TrackInfo: React.FC<IProps> = ({ track }) => {
  if (!track || track.id === "") return null;

  return <H1>{track?.name}</H1>;
};

export default TrackInfo;
