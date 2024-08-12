import SpotifyPlayer from "react-spotify-web-playback";
import { ITrack, IState } from "../../types";

interface IProps {
  token: string | null;
  tracks: Array<string>;
  setTrack: React.Dispatch<React.SetStateAction<ITrack | null>>;
}

const Controls: React.FC<IProps> = ({ token, tracks, setTrack }) => {
  return (
    <>
      <SpotifyPlayer
        token={token}
        uris={tracks}
        hideCoverArt={true}
        hideAttribution={true}
        inLineVolume={false}
        styles={{
          trackArtistColor: "#fff",
          trackNameColor: "#fff",
        }}
        callback={(state: IState) => {
          setTrack(state.track);
        }}
      />
    </>
  );
};

export default Controls;
