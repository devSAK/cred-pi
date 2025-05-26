import React, { useState } from "react";
import { Pi } from "@pinetwork-js/sdk";
import axios from "axios";
import Home from "./components/Home";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const scopes = ["username"];
    const pi = new Pi();

    try {
      const authResult = await pi.authenticate(scopes);
      const { accessToken } = authResult;

      const response = await axios.post(
        "http://<your-local-ip>:5000/verify-user",
        { accessToken }
      );

      if (response.data.verified) {
        setUser(response.data.user);
      } else {
        alert("Verification failed");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      {!user ? (
        <button onClick={handleLogin}>Login with Pi</button>
      ) : (
        <Home user={user} />
      )}
    </div>
  );
};

export default App;
