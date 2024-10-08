import { useEffect, useState } from "react";
import Login from "../Login";
import TrackInfo from "../TrackInfo";
import { getAccessToken } from "../../Auth";
import axios from "axios";
import Nav from "../Nav";
import { GlobalStyle } from "../../styles";
import { Container, TrackViewer, Side } from "./styles";
import Sidebar from "../Sidebar";
import { ITrack } from "../../types";

function App() {
  const GlobalStyleProxy: any = GlobalStyle;
  const apiVersion = "v1";
  const baseURL = `https://api.spotify.com/${apiVersion}`;

  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState<Array<ITrack> | null>(null); // Adjusted to store track details
  const [track, setTrack] = useState<ITrack | null>(null);

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (code && !token) {
      getToken();
    }
    if (token) {
      getUserInfo();
      getPlaylists();
    }
  }, [code, token]);

  const getToken = async () => {
    if (code) {
      try {
        const accessToken = await getAccessToken(clientId, code);
        console.log("accessToken: ", accessToken);
        setToken(accessToken);
      } catch (error) {
        console.error("Failed to get access token:", error);
      }
    }
  };

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(baseURL + "/me", getApiHeaders(token));

      const { images } = data;

      if (Array.isArray(images) && images.length > 0) {
        setProfile(data?.images[0].url);
      } else {
        console.error("Failed to load profile image");
      }
    } catch (error) {
      console.error("Error fetching profile data: ", error);
    }
  };

  const getPlaylists = async () => {
    try {
      const { data } = await axios.get(
        baseURL + "/me/playlists",
        getApiHeaders(token)
      );

      const playlists = data.items.map(
        ({ name, id }: { name: string; id: string }) => {
          return { name, id };
        }
      );
      setPlaylists(playlists);
    } catch (error) {
      console.error("Error fetching playlists data: ", error);
    }
  };

  const getTracks = async (id: string) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/playlists/${id}/tracks`,
        getApiHeaders(token)
      );

      // Adjusted to store detailed track information
      const tracks = data.items.map((item: any) => ({
        uri: item.track.uri,
        name: item.track.name,
        album: item.track.album.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(", "),
        image: item.track.album.images[0]?.url,
      }));
      console.log(tracks);
      setTracks(tracks);

      // Set the first track as the current track by default (optional)
      if (tracks.length > 0) {
        setTrack(tracks[0]);
      }
    } catch (error) {
      console.error("Error fetching tracks data: ", error);
    }
  };

  const getApiHeaders = (token: string | null) => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  // Conditional rendering based on token
  if (!token) {
    return (
      <>
        <GlobalStyleProxy />
        <Login />
      </>
    );
  } else {
    return (
      <>
        <GlobalStyleProxy />
        <Nav profile={profile} />
        <Container>
          <TrackViewer>
            <TrackInfo track={track} />
          </TrackViewer>
          <Side>
            <Sidebar
              token={token}
              tracks={tracks || []}
              playlists={playlists}
              getTracks={getTracks}
              setTrack={setTrack}
              track={track}
            />
          </Side>
        </Container>
      </>
    );
  }
}

export default App;
