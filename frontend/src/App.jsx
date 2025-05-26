import React, { useState, useEffect } from "react";
import { Pi } from "@pinetwork-js/sdk";
import axios from "axios";
import Home from "./components/Home";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("PiNetwork object available:", !!window.PiNetwork);
    // Initialize the SDK first
    if (window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: false, // Set to false in production
      });
    }
  }, []);

  const handleLogin = async () => {
    try {
      // Then authenticate
      const scopes = ["username", "payments"]; // or add 'payments' if needed
      const authResult = await Pi.authenticate(scopes);
      const { accessToken } = authResult;

      // Send token to backend for verification
      const response = await axios.post(
        "https://cred-pi.onrender.com/verify-user",
        { accessToken }
      );

      if (response.data.verified) {
        setUser(response.data.user);
      } else {
        alert("Verification failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
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
