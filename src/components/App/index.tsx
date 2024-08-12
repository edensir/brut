import { useEffect, useState } from "react";
import Login from "../Login";
import TrackInfo from "../TrackInfo";
import { getAccessToken } from "../../Auth";
import axios from "axios";
import Nav from "../Nav";
import { GlobalStyle } from "../../styles";
import { Container, TrackViewer, Side } from "./styles";
import Sidebar from "../Sidebar";

function App() {
  const GlobalStyleProxy: any = GlobalStyle;

  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState<Array<string> | null>(null);

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
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });

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
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
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
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      );
      const uris = Object.entries(data.items).map(
        ([key, val]) => val.track.uri
      );
      console.log(uris);
      setTracks(uris);
    } catch (error) {
      console.error("Error fetching tracks data: ", error);
    }
  };

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
            <TrackInfo />
          </TrackViewer>
          <Side>
            <Sidebar
              token={token}
              tracks={tracks}
              playlists={playlists}
              getTracks={getTracks}
            />
          </Side>
        </Container>
      </>
    );
  }
}

export default App;
