import SpotifyPlayer from "react-spotify-web-playback";
import { ITrack, IState } from "../../types";

interface IProps {
  token: string | null;
  tracks: ITrack[];
  setTrack: React.Dispatch<React.SetStateAction<ITrack | null>>;
}

const Controls: React.FC<IProps> = ({ token, tracks, setTrack }) => {
  return (
    <>
      <SpotifyPlayer
        token={token || ""}
        uris={tracks.map((track) => track.uri)}
        hideCoverArt={true}
        hideAttribution={true}
        inlineVolume={false}
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
