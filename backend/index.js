const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/verify-user", async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res
      .status(400)
      .json({ verified: false, error: "Missing accessToken" });
  }

  try {
    const response = await axios.get("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // This response contains real user info from Pi servers
    const user = response.data;

    return res.status(200).json({ verified: true, user });
  } catch (err) {
    console.error(
      "Token verification failed:",
      err.response?.data || err.message
    );
    return res
      .status(401)
      .json({ verified: false, error: "Invalid access token" });
  }
});

// Handle Pi payment approval
app.post("/payment-approve", async (req, res) => {
  const { paymentId } = req.body;

  if (!paymentId) {
    return res.status(400).json({ success: false, error: "Missing paymentId" });
  }

  console.log("Payment Approved:", paymentId);

  // Here you can store the paymentId, log, or perform checks
  return res.status(200).json({ success: true });
});

// Handle Pi payment completion
app.post("/payment-complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  if (!paymentId || !txid) {
    return res
      .status(400)
      .json({ success: false, error: "Missing paymentId or txid" });
  }

  console.log("Payment Completed:", paymentId, txid);

  // You can confirm or record the transaction here (e.g., in DB)
  return res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
