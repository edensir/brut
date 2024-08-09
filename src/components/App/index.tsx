import { useEffect, useState } from "react";
import Login from "../Login";
import TrackInfo from "../TrackInfo";
import { getAccessToken } from "../../Auth";
import axios from "axios";
import Nav from "../Nav";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    if (code && !token) {
      getToken();
    }
    if (token) {
      getUserInfo();
    }
  }, [code, token]); // add token and code as dependencies

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
        console.error("failed to load profile image");
      }
    } catch (error) {
      console.error("error fetching profile data: ", error);
    }
  };

  // Conditional rendering based on token
  if (!token) {
    return (
      <>
        <Login />
      </>
    );
  } else {
    return (
      <>
        <Nav profile={profile} />
        <TrackInfo />
      </>
    );
  }
}

export default App;
