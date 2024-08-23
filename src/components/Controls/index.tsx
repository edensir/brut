import SpotifyPlayer from "react-spotify-web-playback";
import { ITrack, IState } from "../../types";
import { useState } from "react";

interface IProps {
  token: string | null;
  tracks: ITrack[];
  setTrack: React.Dispatch<React.SetStateAction<ITrack | null>>;
}

const Controls: React.FC<IProps> = ({ token, tracks, setTrack }) => {
  const [play, setPlay] = useState(true);

  return (
    <>
      <SpotifyPlayer
        token={token || ""}
        play={play}
        uris={tracks.map((track) => track.uri)}
        hideCoverArt={true}
        hideAttribution={true}
        inlineVolume={false}
        layout={"compact"}
        styles={{
          trackArtistColor: "#fff",
          trackNameColor: "#fff",
          sliderColor: "#fff",
        }}
        callback={(state: IState) => {
          setTrack(state.track);
          if (!state.isPlaying) {
            setPlay(true);
          }
        }}
      />
    </>
  );
};

export default Controls;
