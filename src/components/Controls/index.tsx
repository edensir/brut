import SpotifyPlayer from "react-spotify-web-playback";

interface IProps {
  token: string | null;
  tracks: Array<string>;
}

const Controls: React.FC<IProps> = ({ token, tracks }) => {
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
      />
    </>
  );
};

export default Controls;
